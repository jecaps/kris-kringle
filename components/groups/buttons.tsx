import { createGroupSantaMapping } from "@/lib/actions";
import { Button } from "primereact/button";

export function ShuffleButton({ id }: { id: string }) {
    const createSantaMapping = createGroupSantaMapping.bind(null, id);

    return (
        <form action={createSantaMapping}>
            <Button size="small" rounded text>
                Assign Secret Santas
            </Button>
        </form>
    );
}
