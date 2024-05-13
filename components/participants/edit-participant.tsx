/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { InputText } from "primereact/inputtext";
import { updateParticipant } from "@/lib/data";
import { useFormState, useFormStatus } from "react-dom";

import Btn from "../ui/button";
import { useEffect, useRef } from "react";
import { Toast } from "primereact/toast";

function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <Btn
            loading={pending}
            type="submit"
            icon="pi pi-check"
            className="md:w-3 w-9 justify-content-center gap-1"
            size="small"
            rounded
        >
            {pending? "Saving" :"Save"}
        </Btn>
    );
}

export default function EditParticipant({
    groupId,
    participant,
    closeEditDialog,
}: {
    groupId: string;
    participant: any;
    closeEditDialog: () => void;
}) {
    const toast = useRef<Toast>(null);
    const editGroupParticipant = updateParticipant.bind(null, groupId);
    const editParticipantDetails = editGroupParticipant.bind(
        null,
        participant.id
    );
    const [state, dispatch] = useFormState(editParticipantDetails, undefined);

    useEffect(() => {
        if (state) {
            closeEditDialog();
        }
    }, [state]);

    return (
        <>
            <form action={dispatch} className="grid">
                <div className="col-6">
                    <label htmlFor="name" className="text-xs pl-1">
                        Name
                    </label>
                    <InputText
                        className="p-inputtext-sm w-full mt-1 focus:shadow-none"
                        name="name"
                        id="name"
                        defaultValue={participant?.name}
                        autoFocus
                    />
                </div>
                <div className="col-6">
                    <label htmlFor="email" className="text-xs pl-1">
                        Email
                    </label>
                    <InputText
                        className="p-inputtext-sm w-full mt-1 focus:shadow-none"
                        name="email"
                        id="email"
                        defaultValue={participant?.email}
                    />
                </div>
                <div className="col-12">
                    <label htmlFor="wishlist" className="text-xs pl-1">
                        Wishlist
                    </label>
                    <InputText
                        className="p-inputtext-sm w-full mt-1 focus:shadow-none"
                        name="wishlist"
                        id="wishlist"
                        defaultValue={participant?.wishlist?.join(", ")}
                    />
                </div>
                <div className="col-12 flex justify-content-center gap-2">
                    <Btn
                        type="button"
                        icon="pi pi-times"
                        className="md:w-3 w-9 justify-content-center gap-1"
                        size="small"
                        onClick={closeEditDialog}
                        outlined
                        rounded
                    >
                        Cancel
                    </Btn>
                    <SubmitButton />
                </div>
            </form>
            <Toast ref={toast} />
        </>
    );
}