import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Skeleton } from "primereact/skeleton";

const dummyParticipants = [
    {
        id: 1,
        name: "",
        wishlist: [""],
    },
    {
        id: 2,
        name: "",
        wishlist: [""],
    },
    {
        id: 3,
        name: "",
        wishlist: [""],
    },
    {
        id: 4,
        name: "",
        wishlist: [""],
    },
    {
        id: 5,
        name: "",
        wishlist: [""],
    },
];

export default function ParticipantsListSkeleton() {
    return (
        <DataTable value={dummyParticipants}>
            <Column
                style={{ width: "17%" }}
                field="name"
                body={(_, { rowIndex }) => <>{rowIndex + 1}</>}
            ></Column>
            <Column
                style={{ width: "33%" }}
                field="name"
                header="Name"
                body={<Skeleton />}
            ></Column>
            <Column
                style={{ width: "50%" }}
                field={"wishlist"}
                header="Wishlist"
                body={<Skeleton />}
            ></Column>
        </DataTable>
    );
}
