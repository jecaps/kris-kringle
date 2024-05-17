"use client";

import { useState } from "react";
import { Participant } from "@prisma/client";
import { Dialog } from "primereact/dialog";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import EditParticipant from "./edit-participant";

export default function ParticipantsList({
    id,
    participants,
}: {
    id: string;
    participants: Participant[] | undefined;
}) {
    const [editVisible, setEditVisible] = useState(false);
    const [editingParticipant, setEditingParticipant] =
        useState<Participant | null>(null);

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
        </>
    );
}
