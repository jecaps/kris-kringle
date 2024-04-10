import { createGroupSantaMapping } from "@/lib/actions";
import Btn from "../ui/button";

export function ShuffleButton({ id }: { id: string }) {
    const createSantaMapping = createGroupSantaMapping.bind(null, id);

    return (
        <>
            <form action={createSantaMapping}>
                <Btn>Shuffle</Btn>
            </form>
        </>
    );
}
