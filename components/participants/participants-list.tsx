"use client";

import { useEffect, useRef, useState } from "react";
import { Toast } from "primereact/toast";
import { Dialog } from "primereact/dialog";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

import Btn from "../ui/button";
import CreateParticipantForm from "./create-participant";

interface Participant {
    id: string;
    email: string;
    name: string;
    wishlist: string[];
}

export default function ParticipantsList({
    id,
    participants,
}: {
    id: string;
    participants: Participant[] | undefined;
}) {
    const toast = useRef<Toast>(null);
    const [visible, setVisible] = useState(false);
    const [url, setUrl] = useState("");

    function openDialogHandler() {
        window.history.pushState({}, "", `?dialog=true`);
        setVisible(true);
    }

    function closeDialogHandler() {
        window.history.pushState({}, "", `/groups/${id}`);
        setVisible(false);
    }

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

    function wishlistBodyTemplate(rowData: Participant) {
        return <>{rowData.wishlist.join(", ")}</>;
    }

    useEffect(() => {
        setUrl(window.location.origin + `/groups/${id}`);
    }, []);

    return (
        <>
            <DataTable value={participants} size="small">
                <Column
                    style={{ width: "17%" }}
                    body={(_, { rowIndex }) => <>{rowIndex + 1}</>}
                ></Column>
                <Column
                    style={{ width: "33%" }}
                    field="name"
                    header="Name"
                ></Column>
                <Column
                    style={{ width: "50%" }}
                    field={"wishlist"}
                    header="Wishlist"
                    body={wishlistBodyTemplate}
                ></Column>
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
                        onClick={openDialogHandler}
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
                visible={visible}
                onHide={closeDialogHandler}
                className="md:w-3"
            >
                <CreateParticipantForm
                    id={id}
                    closeDialog={closeDialogHandler}
                />
            </Dialog>
            <Toast ref={toast} />
        </>
    );
}
