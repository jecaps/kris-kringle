"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { fetchGroupParticipants } from "./data";

export async function createParticipant(
    id: string,
    _state: any,
    formData: FormData
) {
    const name = formData.get("name");
    const wishlist = formData.get("wishlist");
    const email = formData.get("email");

    if (!name || !wishlist || !email) {
        return {
            error: "All fields are required.",
        };
    }

    let wishlistArray: string[] | undefined;

    if (typeof wishlist === "string") {
        wishlistArray = wishlist.split(", ");
    }

    try {
        await prisma.participant.create({
            data: {
                name: name as string,
                email: email as string,
                wishlist: wishlistArray,
                group: {
                    connect: {
                        id: id,
                    },
                },
            },
        });
        revalidatePath(`/groups/${id}`, "page");
        return { message: `${name} has been added to the group!` };
    } catch (error) {
        console.error(error);
        return { error: "An error occurred while adding the participant." };
    }
}

export async function createGroup(_state: any, formData: FormData) {
    const name = formData.get("name");
    const budget = formData.get("budget");
    const dateOfExchange = formData.get("exchangeDate");
    const password = formData.get("password");
    const reenterPassword = formData.get("reenterPassword");

    if (password !== reenterPassword) {
        return {
            error: "Passwords do not match.",
        };
    }

    if (!name || !budget || !dateOfExchange || !password) {
        return {
            error: "All fields are required.",
        };
    }

    const group = await prisma.group.create({
        data: {
            name: name as string,
            password: password as string,
            budget: +budget,
            dateOfExchange: dateOfExchange as string,
        },
    });

    redirect(`/groups/${group.id}`);
}

export async function createGroupSantaMapping(id: string) {
    const participants = await fetchGroupParticipants(id);

    const shuffledParticipants = shuffleParticipants(participants);

    const createPromises = shuffledParticipants.map((santa, i) => {
        return prisma.santaMapping.create({
            data: {
                participantId: participants[i].id,
                santaId: santa.id,
            },
        });
    });

    await Promise.all(createPromises);

    return {
        message:
            "The names have been shuffled! An email will be sent to each participant of this group with the name and the wishlist of the person they are giving a gift to.",
    };
}
