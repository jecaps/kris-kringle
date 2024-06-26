"use server";

import prisma from "@/lib/db";
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
    const name = formData.get("name");
    const budget = formData.get("budget");
    const dateOfExchange = formData.get("exchangeDate");
    const password = formData.get("password");
    const reenterPassword = formData.get("reenterPassword");

    if (!name || !budget || !dateOfExchange || !password || !reenterPassword) {
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

// export async function createGroupSantaMapping(id: string) {
//     await deleteSantaMapping(id);
//     const participants = await fetchGroupParticipants(id);

//     const shuffledParticipants = shuffleParticipants(participants);

//     const createPromises = shuffledParticipants.map((santa, i) => {
//         return prisma.santaMapping.create({
//             data: {
//                 participantId: participants[i].id,
//                 santaId: santa.id,
//                 groupId: id,
//             },
//         });
//     });

//     await Promise.all(createPromises);

//     sendEmail(id);

//     return {
//         message:
//             "The names have been shuffled! An email will be sent to each participant of this group with the name and the wishlist of the person they are giving a gift to.",
//     };
// }

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

        await sendEmail(id); // Assuming sendEmail returns a promise

        return {
            message:
                "The names have been shuffled! An email will be sent to each participant of this group with the name and the wishlist of the person they are giving a gift to.",
        };
    } catch (error) {
        console.error(error);
        throw new Error("Failed to create group santa mapping and send email");
    }
}
