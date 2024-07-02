"use server";

import prisma from "@/lib/db";
import bcrypt from "bcrypt";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { fetchGroupParticipants, deleteSantaMapping } from "./data";
import { sendEmail, shuffleParticipants } from "./utils";
import { z } from "zod";

const ParticipantSchema = z.object({
    name: z.string(),
    wishlist: z.string(),
    email: z.string().email(),
});

const GroupSchema = z.object({
    name: z.string(),
    budget: z.string().transform(parseFloat),
    dateOfExchange: z.string(),
    password: z.string(),
    verifyPassword: z.string(),
});

export async function createParticipant(
    id: string,
    _state: any,
    formData: FormData
) {
    const data = {
        name: formData.get("name"),
        wishlist: formData.get("wishlist"),
        email: formData.get("email"),
    };

    try {
        const validatedData = ParticipantSchema.parse(data);

        let wishlistArray: string[] | undefined;

        if (typeof validatedData.wishlist === "string") {
            wishlistArray = validatedData.wishlist.split(", ");
        }

        await prisma.participant.create({
            data: {
                name: validatedData.name,
                email: validatedData.email,
                wishlist: wishlistArray,
                group: {
                    connect: {
                        id: id,
                    },
                },
            },
        });
        revalidatePath(`/groups/${id}`, "page");
        return {
            message: `${validatedData.name} has been added to the group!`,
        };
    } catch (error) {
        console.error(error);
        return { error: "An error occurred while adding the participant." };
    }
}

export async function createGroup(_state: any, formData: FormData) {
    const data = {
        name: formData.get("name"),
        budget: formData.get("budget"),
        dateOfExchange: formData.get("exchangeDate"),
        password: formData.get("password"),
        verifyPassword: formData.get("verify-password"),
    };

    const validatedData = GroupSchema.parse(data);

    if (
        !validatedData.name ||
        !validatedData.budget ||
        !validatedData.dateOfExchange ||
        !validatedData.password ||
        !validatedData.verifyPassword
    ) {
        return {
            error: "All fields are required.",
        };
    }

    const saltRounds = 15;
    const hashedPassword = await bcrypt.hash(
        validatedData.password,
        saltRounds
    );

    const group = await prisma.group.create({
        data: {
            name: validatedData.name,
            password: hashedPassword,
            budget: validatedData.budget,
            dateOfExchange: validatedData.dateOfExchange,
        },
    });

    redirect(`/groups/${group.id}`);
}

export async function createGroupSantaMapping(id: string) {
    try {
        await deleteSantaMapping(id);
        const participants = await fetchGroupParticipants(id);

        const shuffledParticipants = shuffleParticipants(participants);

        const createPromises = shuffledParticipants.map((santa, i) => {
            return prisma.santaMapping.create({
                data: {
                    participantId: participants[i].id,
                    santaId: santa.id,
                    groupId: id,
                },
            });
        });

        await Promise.all(createPromises);

        await sendEmail(id);

        return {
            message:
                "The names have been shuffled! An email will be sent to each participant of this group with the name and the wishlist of the person they are giving a gift to.",
        };
    } catch (error) {
        console.error(error);
        throw new Error("Failed to create group santa mapping and send email");
    }
}
