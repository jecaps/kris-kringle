import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";

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
