"use server";

import prisma from "./db";
import { z } from "zod";
import { compare } from "bcrypt";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const MatchPasswordSchema = z.object({
    enteredPassword: z.string(),
});

export async function fetchGroup(id: string) {
    return await prisma.group.findUnique({
        where: {
            id: id,
        },
        include: {
            participants: true,
        },
    });
}

export async function fetchGroupParticipants(id: string) {
    return await prisma.participant.findMany({
        where: {
            groupId: id,
        },
    });
}

export async function fetchParticipant(participantId: string) {
    return await prisma.participant.findFirst({
        where: {
            id: participantId,
        },
    });
}

export async function fetchSantaMapping(id: string) {
    const santaMap = await prisma.santaMapping.findMany({
        where: {
            groupId: id,
        },
    });

    const group = await fetchGroup(id);

    const result = await Promise.all(
        santaMap.map(async (item) => {
            const santa = await prisma.participant.findUnique({
                where: {
                    id: item.santaId,
                },
            });

            const buddy = await prisma.participant.findUnique({
                where: {
                    id: item.participantId,
                },
            });

            return {
                santaName: santa?.name,
                santaEmail: santa?.email,
                receiver: buddy?.name,
                receiverWishlist: buddy?.wishlist,
            };
        })
    );

    return { group, result };
}

export async function getGroupPassword(groupId: string) {
    const group = await prisma.group.findUnique({
        where: {
            id: groupId,
        },
    });

    return group?.password;
}

export async function updateGroup(
    groupId: string,
    _state: any,
    groupData: FormData
) {
    try {
        const name = groupData.get("name");
        const budget = groupData.get("budget");
        const dateOfExchange = groupData.get("exchangeDate");

        await prisma.group.update({
            where: {
                id: groupId,
            },
            data: {
                name: name as string,
                budget: Number(budget),
                dateOfExchange: dateOfExchange as string,
            },
        });

        revalidatePath(`/groups/${groupId}`, "page");
        return { message: "Changes saved!" };
    } catch (error) {
        console.error(`Failed to update group: ${error}`);
        throw error;
    }
}

export async function updateParticipant(
    groupId: string,
    participantId: string,
    _state: any,
    participantData: any
) {
    const name = participantData.get("name");
    const email = participantData.get("email");
    const wishlist = participantData.get("wishlist");

    try {
        await prisma.participant.update({
            where: {
                id: participantId,
            },
            data: {
                name: name as string,
                email: email as string,
                wishlist: wishlist.split(", "),
            },
        });
        revalidatePath(`/groups/${groupId}`, "page");
        return { message: "Changes saved!" };
    } catch (error) {
        console.error(error);
        return { error: "An error occurred while updating changes." };
    }
}

export async function deleteGroup(groupId: string) {
    await prisma.santaMapping.deleteMany({
        where: {
            groupId: groupId,
        },
    });

    await prisma.participant.deleteMany({
        where: {
            groupId: groupId,
        },
    });

    await prisma.group.delete({
        where: {
            id: groupId,
        },
    });

    redirect("/");
}

export async function deleteParticipant(
    groupId: string,
    participantId: string
) {
    await prisma.participant.delete({
        where: {
            id: participantId,
        },
    });

    revalidatePath(`/groups/${groupId}`, "page");
}

export async function deleteSantaMapping(groupId: string) {
    return await prisma.santaMapping.deleteMany({
        where: {
            groupId: groupId,
        },
    });
}

export async function checkPassword(
    groupId: string,
    _state: any,
    formData: FormData
) {
    const data = { enteredPassword: formData.get("enteredPassword") };
    const groupPassword = await getGroupPassword(groupId);

    if (!groupPassword) {
        return { error: "Group password not found", response: false };
    }

    const validatedData = MatchPasswordSchema.parse(data);
    const isMatch = await compare(validatedData.enteredPassword, groupPassword);

    if (!isMatch) {
        return { error: "Wrong Password", response: false };
    }

    return { response: true };
}
