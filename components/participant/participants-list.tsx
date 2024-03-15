import prisma from "@/lib/db";

export default async function ParticipantsList() {
    const participants = await prisma.participant.findMany();

    return (
        <div>
            <h2>Participants</h2>
            <ul>
                {participants.map((participant) => (
                    <li key={participant.id}>{participant.name}</li>
                ))}
            </ul>
        </div>
    );
}
