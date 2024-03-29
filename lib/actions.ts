"use server";

import prisma from "@/lib/db";
import { redirect } from "next/navigation";

type PreviousState = {
    error?: { name_error?: string; wishlist_error?: string } | undefined;
};

type PreviousStateGroup =
    | { error: string; resetForm?: boolean; message?: undefined }
    | undefined;

export async function createParticipant(_prevState: any, formData: FormData) {
    const name = formData.get("name");
    const wishlist = formData.get("wishlist");

    if (!name && !wishlist) {
        return {
            error: {
                name_error: "Please enter your name.",
                wishlist_error: "Please enter your wishlist.",
            },
        };
    }

    if (!wishlist) {
        return {
            error: { wishlist_error: "Please enter your wishlist." },
        };
    }

    if (!name) {
        return {
            error: { name_error: "Please enter your name." },
        };
    }

    let wishlistArray: string[] | undefined;

    if (typeof wishlist === "string") {
        wishlistArray = wishlist.split(", ");
    }

    await prisma.participant.create({
        data: {
            name: name as string,
            wishlist: wishlistArray,
        },
    });
    redirect("/");
}

export async function createGroup(
    _state: PreviousStateGroup,
    formData: FormData
) {
    const name = formData.get("groupName");
    const budget = formData.get("giftBudget");
    const dateOfExchange = formData.get("exchangeDate");

    if (!name && !budget && !dateOfExchange) {
        return {
            error: "All fields are required.",
            resetForm: false,
        };
    }

    if (!name) {
        return {
            error: "Please enter a group name",
            resetForm: false,
        };
    }

    if (!budget) {
        return {
            error: "Please enter a budget",
            resetForm: false,
        };
    }

    if (!dateOfExchange) {
        return {
            error: "Please enter a date of exchange",
            resetForm: false,
        };
    }

    await prisma.group.create({
        data: {
            name: name as string,
            budget: +budget,
            dateOfExchange: dateOfExchange as string,
        },
    });

    redirect("/add-participant");
}

export async function createSanta() {
    await prisma.santaMapping.deleteMany();

    const participants = await prisma.participant.findMany();

    let shuffled = [...participants].sort(() => Math.random() - 0.5);

    for (let i = 0; i < participants.length; i++) {
        if (participants[i].id === shuffled[i].id) {
            const nextIndex = (i + 1) % shuffled.length;
            [shuffled[i], shuffled[nextIndex]] = [
                shuffled[nextIndex],
                shuffled[i],
            ];
        }
    }

    const createPromises = shuffled.map((santa, i) => {
        return prisma.santaMapping.create({
            data: {
                participantId: participants[i].id,
                santaId: santa.id,
            },
        });
    });

    await Promise.all(createPromises);

    return "The names have been shuffled! An email will be sent to each participant of this group with the name and the wishlist of the person they are giving a gift to.";
}
