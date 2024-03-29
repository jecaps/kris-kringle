"use server";

import prisma from "./db";

export async function getParticipants() {
    return await prisma.participant.findMany();
}
