"use client";

import { useRef, useState } from "react";
import { Participant } from "@prisma/client";
import { Toast } from "primereact/toast";
import { Dialog } from "primereact/dialog";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";

import Btn from "../ui/button";
import CreateParticipantForm from "./create-participant";
import EditParticipant from "./edit-participant";

export default function ParticipantsList({
    id,
    participants,
}: {
    id: string;
    participants: Participant[] | undefined;
}) {
    const toast = useRef<Toast>(null);
    const [createVisible, setCreateVisible] = useState(false);
    const [editVisible, setEditVisible] = useState(false);
    const [editingParticipant, setEditingParticipant] =
        useState<Participant | null>(null);

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

    function wishlistBodyTemplate(participant: Participant) {
        return <>{participant.wishlist.join(", ")}</>;
    }

    function editButton(participant: Participant) {
        const openEditDialog = () => {
            setEditingParticipant(participant);
            setEditVisible(true);
        };

        const closeEditDialog = () => {
            setEditVisible(false);
        };

        return (
            <>
                <Button
                    className="w-2rem h-2rem p-0 focus:shadow-none"
                    icon="pi pi-pencil"
                    onClick={openEditDialog}
                    style={{ backgroundColor: "transparent" }}
                    size="small"
                    text
                />
                <Dialog
                    header="Edit Participant Details"
                    visible={editVisible}
                    onHide={closeEditDialog}
                    className="md:w-3"
                >
                    <EditParticipant
                        groupId={id}
                        participant={editingParticipant}
                        closeEditDialog={closeEditDialog}
                    />
                </Dialog>
            </>
        );
    }

    return (
        <>
            <DataTable value={participants} size="small">
                <Column
                    className="w-12rem"
                    body={(_, { rowIndex }) => <>{rowIndex + 1}</>}
                ></Column>
                <Column className="w-20rem" field="name" header="Name"></Column>
                <Column
                    className="w-30rem"
                    field={"wishlist"}
                    header="Wishlist"
                    body={wishlistBodyTemplate}
                ></Column>
                <Column body={editButton} className="w-3rem"></Column>
            </DataTable>

            <div className="flex flex-column align-items-center gap-2 text-center mt-4">
                <div className="flex flex-column align-items-center w-full">
                    <p className="text-sm">
                        It&apos;s not too late to join the gift exchange. Add
                        your name to the list now!
                    </p>
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
                </div>
                <div className="flex flex-column align-items-center w-full">
                    <p className="text-sm">
                        Know someone who would be interested? Invite them to
                        join the gift exchange by the share link button.
                    </p>
                    <Btn
                        icon="pi pi-link"
                        className="md:w-3 w-9 justify-content-center gap-1 mt-2"
                        onClick={copyLinkHandler}
                        size="small"
                        severity="secondary"
                        rounded
                    >
                        Share Link
                    </Btn>
                </div>
            </div>

            <Dialog
                header="Add Member"
                visible={createVisible}
                onHide={() => setCreateVisible(false)}
                className="md:w-3"
            >
                <CreateParticipantForm
                    id={id}
                    closeDialog={() => setCreateVisible(false)}
                />
            </Dialog>

            <Toast ref={toast} />
        </>
    );
}
