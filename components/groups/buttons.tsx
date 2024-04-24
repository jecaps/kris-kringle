"use client";

import { createGroupSantaMapping } from "@/lib/actions";
import { Button } from "primereact/button";
import Btn from "../ui/button";

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

export function SettingsButton({ id }: { id: string }) {
    return (
        <Btn
            icon="pi pi-pencil"
            className="absolute p-0 w-2rem"
            style={{ right: "-3rem", top: "0.5rem" }}
            text
            severity="secondary"
            href={`/groups/${id}/edit`}
        ></Btn>
    );
}
