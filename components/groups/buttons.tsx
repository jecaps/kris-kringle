"use client";

import { useFormState, useFormStatus } from "react-dom";
import { useEffect, useRef } from "react";
import { createGroupSantaMapping } from "@/lib/actions";
import { Toast } from "primereact/toast";
import Btn from "../ui/button";

function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <Btn
            size="small"
            loading={pending}
            severity="secondary"
            rounded
            text
            className={pending ? "justify-content-center gap-2" : ""}
        >
            {pending ? "Assigning" : "Assign Secret Santas"}
        </Btn>
    );
}

export function ShuffleButton({ id }: { id: string }) {
    const toast = useRef<Toast>(null);

    const createSantaMapping = createGroupSantaMapping.bind(null, id);
    const [state, dispatch] = useFormState(createSantaMapping, undefined);

    useEffect(() => {
        if (state) {
            toast.current?.show({
                severity: "success",
                detail: state.message,
                life: 5000,
            });
        }
    });

    return (
        <>
            <form action={dispatch}>
                <SubmitButton />
            </form>
            <Toast ref={toast} position="bottom-center" />
        </>
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
