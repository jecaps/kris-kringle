import ParticipantsList from "@/components/participant/participants-list";
import Content from "@/components/content";

export default function HomePage() {
    return (
        <>
            <h1>Kris Kringle</h1>
            <Content>
                <ParticipantsList />
            </Content>
        </>
    );
}
