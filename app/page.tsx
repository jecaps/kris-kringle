import { assignSanta } from "@/lib/actions";
import ParticipantsList from "@/components/participant/participants-list";
import Button from "@/components/ui/button";

export default function HomePage() {
    return (
        <>
            <h1>Kris Kringle</h1>
            <ParticipantsList />
            <div>
                <Button onClick={assignSanta}>Shuffle Names</Button>
            </div>
        </>
    );
}
