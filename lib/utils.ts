import prisma from "./db";

export async function assignSanta() {
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
}
