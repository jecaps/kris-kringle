"use client";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useEffect, useState } from "react";
import ParticipantsListSkeleton from "../skeleton/participants-list-skeleton";

interface Participant {
    id: number;
    name: string;
    wishlist: string[];
}

export default function ParticipantsList() {
    const [participants, setParticipants] = useState([]);

    useEffect(() => {
        async function getParticipants() {
            const res = await fetch("/api", {
                method: "GET",
            });
            const data = await res.json();
            setParticipants(data.result);
        }
        getParticipants();
    }, []);

    const wishlistBodyTemplate = (rowData: Participant) => {
        return <>{rowData.wishlist.join(", ")}</>;
    };

    return (
        <>
            {participants?.length === 0 ? (
                <ParticipantsListSkeleton />
            ) : (
                <DataTable value={participants}>
                    <Column
                        style={{ width: "5em" }}
                        body={(_, { rowIndex }) => <>{rowIndex + 1}</>}
                    ></Column>
                    <Column
                        style={{ width: "10em" }}
                        field="name"
                        header="Name"
                    ></Column>
                    <Column
                        style={{ width: "15em" }}
                        field={"wishlist"}
                        header="Wishlist"
                        body={wishlistBodyTemplate}
                    ></Column>
                </DataTable>
            )}
        </>
    );
}
