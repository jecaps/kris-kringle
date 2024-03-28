"use server";

import prisma from "@/lib/db";
import { redirect } from "next/navigation";

export async function getParticipants() {
    return await prisma.participant.findMany();
}

export async function addParticipant(_prevState: any, formData: FormData) {
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

export async function assignSanta() {
    // delete all existing santa mappings
    await prisma.santaMapping.deleteMany();

    const participants = await prisma.participant.findMany();

    const shuffled = [...participants].sort(() => Math.random() - 0.5);

    for (let i = 0; i < participants.length; i++) {
        const participant = participants[i];
        const santa = shuffled[i];

        if (participant.id === santa.id) {
            const nextIndex = (i + 1) % shuffled.length;
            [shuffled[i], shuffled[nextIndex]] = [
                shuffled[nextIndex],
                shuffled[i],
            ];
        }

        await prisma.santaMapping.create({
            data: {
                participantId: participant.id,
                santaId: shuffled[i].id,
            },
        });
    }

    // send email to each participant with the name and wishlist of the person they are giving a gift to

    return "The names have been shuffled! An email will be sent to each participant of this group with the name and the wishlist of the person they are giving a gift to.";
}

export async function drawName(_prevState: any, formData: FormData) {
    const name = formData.get("name");

    if (!name) {
        return {
            error: "Please enter your name",
            resetForm: false,
        };
    }

    const participant = await prisma.participant.findFirst({
        where: {
            name: name as string,
        },
    });

    if (!participant) {
        return {
            error: `We cannot find '${name}' from the list. Please try again.`,
            resetForm: true,
        };
    }

    const map = await prisma.santaMapping.findFirst({
        where: {
            santaId: participant?.id,
        },
    });

    const nameDrawn = await prisma.participant.findFirst({
        where: {
            id: map?.participantId,
        },
    });

    // send nameDrawn to participant.email using 'create-email' action

    return { response: nameDrawn, resetForm: true };
}
