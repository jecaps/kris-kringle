"use client";

import { useFormState, useFormStatus } from "react-dom";
import { useEffect, useRef, useState } from "react";
import { createGroupSantaMapping, createParticipant } from "@/lib/actions";
import { Toast } from "primereact/toast";
import { Dialog } from "primereact/dialog";
import CreateParticipantForm from "../participants/create-participant";
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
                life: 10000,
            });
        }
    });

    return (
        <>
            <form className="my-auto" action={dispatch}>
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

export function JoinGroupButton({ id }: { id: string }) {
    const toast = useRef<Toast>(null);
    const [createVisible, setCreateVisible] = useState(false);

    const createParticipantToGroup = createParticipant.bind(null, id);
    const [state, dispatch] = useFormState(createParticipantToGroup, undefined);

    useEffect(() => {
        if (state?.message) {
            setCreateVisible(false);
            toast.current?.show({
                severity: "success",
                detail: state?.message,
                life: 5000,
            });
        }
    }, [state]);

    return (
        <>
            <Btn
                icon="pi pi-plus"
                className="md:w-3 w-9 justify-content-center gap-1"
                onClick={() => setCreateVisible(true)}
                size="small"
                severity="help"
                rounded
            >
                Join Group
            </Btn>
            <Dialog
                header="Add Member"
                visible={createVisible}
                onHide={() => setCreateVisible(false)}
                className="md:w-3"
            >
                <CreateParticipantForm
                    closeDialog={() => setCreateVisible(false)}
                    error={state?.error}
                    dispatch={dispatch}
                />
            </Dialog>
            <Toast ref={toast} position="bottom-center" />
        </>
    );
}

export function ShareLinkButton({ id }: { id: string }) {
    const toast = useRef<Toast>(null);

    function copyLinkHandler() {
        navigator.clipboard.writeText(window.location.origin + `/groups/${id}`);
        if (toast.current) {
            toast.current.show({
                severity: "success",
                detail: "Link copied. Share with your friends!",
                life: 5000,
            });
        }
    }

    return (
        <>
            <Btn
                icon="pi pi-link"
                className="md:w-3 w-9 justify-content-center gap-1"
                onClick={copyLinkHandler}
                size="small"
                severity="secondary"
                rounded
            >
                Share Link
            </Btn>
            <Toast ref={toast} />
        </>
    );
}
