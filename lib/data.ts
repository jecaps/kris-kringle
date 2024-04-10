"use server";

import prisma from "./db";

interface Group {
    name: string;
    budget: number;
    password: string;
    dateOfExchange: string;
}

interface Participant {
    name: string;
    email: string;
    wishlist: string[];
}

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

export async function UpdateGroup(groupId: string, groupData: Group) {
    return await prisma.group.update({
        where: {
            id: groupId,
        },
        data: groupData,
    });
}

export async function UpdateParticipant(
    participantId: string,
    participantData: Participant
) {
    return await prisma.participant.update({
        where: {
            id: participantId,
        },
        data: participantData,
    });
}

export async function deleteGroup(groupId: string) {
    return await prisma.group.delete({
        where: {
            id: groupId,
        },
    });
}

export async function deletePariticipant(groupId: string) {
    return await prisma.participant.delete({
        where: {
            id: groupId,
        },
    });
}

// export async function deleteSantaMapping(groupId: string) {
//     return await prisma.santaMapping.deleteMany({
//         where: {
//             groupId: groupId,
//         }
//     })
// }
