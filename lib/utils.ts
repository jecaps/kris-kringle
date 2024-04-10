interface Participant {
    id: string;
    name: string;
    email: string;
    wishlist: string[];
}

function shuffleParticipants(participants: Participant[]) {
    const shuffled = [...participants].sort(() => Math.random() - 0.5);

    for (let i = 0; i < participants.length; i++) {
        if (participants[i].id === shuffled[i].id) {
            const nextIndex = (i + 1) % shuffled.length;
            [shuffled[i], shuffled[nextIndex]] = [
                shuffled[nextIndex],
                shuffled[i],
            ];
        }
    }

    return shuffled;
}
