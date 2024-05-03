"use client";

import { Group } from "@prisma/client";
import { useEffect, useRef, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Calendar } from "primereact/calendar";
import { Toast } from "primereact/toast";
import { TieredMenu } from "primereact/tieredmenu";
import { Button } from "primereact/button";
import { ConfirmDialog } from "primereact/confirmdialog";
import { deleteGroup, updateGroup } from "@/lib/data";
import Btn from "../ui/button";

function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <Btn
            size="small"
            loading={pending}
            severity="success"
            rounded
            className="p-0 w-2rem h-2rem"
            icon="pi pi-check"
        />
    );
}

export default function GroupHeader({ group }: { group: Group }) {
    const { name, budget, dateOfExchange } = group;
    const reformattedDate = dateOfExchange.split("/").reverse().join("-");
    const toast = useRef<Toast>(null);
    const menu = useRef<TieredMenu>(null);

    const removeGroup = deleteGroup.bind(null, group.id);
    const editName = updateGroup.bind(null, group.id);
    const [state, dispatch] = useFormState(editName, undefined);

    const [visible, setVisible] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [enteredDate, setEnteredDate] = useState<Date>();

    const items = [
        {
            label: "Edit Group",
            icon: "pi pi-pencil",
            command: () => setEditMode(true),
        },
        {
            label: "Delete Group",
            icon: "pi pi-trash",
            command: () => setVisible(true),
        },
    ];

    useEffect(() => {
        if (state) {
            setEditMode(false);
            toast.current?.show({
                severity: "success",
                detail: state.message,
                life: 3000,
            });
        }
    }, [state]);

    return (
        <>
            {editMode ? (
                <form
                    action={dispatch}
                    className="flex align-items-center gap-2 h-5rem"
                >
                    <span className="p-float-label">
                        <InputText
                            className="p-inputtext-sm"
                            id="name"
                            name="name"
                            defaultValue={name}
                            autoFocus
                        />
                        <label htmlFor="name">Group Name</label>
                    </span>
                    <span className="p-float-label">
                        <InputNumber
                            className="p-inputtext-sm"
                            id="budget"
                            name="budget"
                            value={budget}
                        />
                        <label htmlFor="budget">Budget</label>
                    </span>
                    <span className="p-float-label">
                        <Calendar
                            className="p-inputtext-sm"
                            id="exchangeDate"
                            name="exchangeDate"
                            dateFormat="dd/mm/yy"
                            value={enteredDate || new Date(reformattedDate)}
                            onChange={(e) => {
                                setEnteredDate(e.value || undefined);
                            }}
                        />
                        <label htmlFor="exchangeDate">Exchange Date</label>
                    </span>
                    <div className="flex align-items-center gap-2">
                        <SubmitButton />
                        <Btn
                            type="button"
                            className="p-0 w-2rem h-2rem"
                            icon="pi pi-times"
                            size="small"
                            severity="danger"
                            rounded
                            onClick={() => setEditMode(false)}
                        />
                    </div>
                </form>
            ) : (
                <div className="flex flex-column align-items-center h-5rem">
                    <div className="relative">
                        <h1 className="m-0 mb-2">{name}</h1>
                        <Button
                            className="absolute w-2rem h-2rem p-0 focus:shadow-none"
                            style={{ right: "-2rem", top: "-0.5rem" }}
                            size="small"
                            text
                            rounded
                            icon="pi pi-cog"
                            onClick={(e) => menu.current?.toggle(e)}
                        ></Button>
                        <TieredMenu model={items} popup ref={menu} />
                    </div>
                    <div className="grid text-center">
                        <span className="col-6 pi pi-gift"></span>
                        <span className="col-6 pi pi-calendar"></span>
                        <p className="col-6 p-0 m-0 text-gray-400 text-xs">
                            Amount: {budget}
                        </p>
                        <p className="col-6 p-0 m-0 text-gray-400 text-xs">
                            Date: {dateOfExchange}
                        </p>
                    </div>
                </div>
            )}
            <ConfirmDialog
                header="Delete Confirmation"
                visible={visible}
                onHide={() => setVisible(false)}
                message="Are you sure you want to delete this group?"
                icon="pi pi-exclamation-triangle"
                accept={removeGroup}
                reject={() => setVisible(false)}
                defaultFocus="reject"
                acceptClassName="p-button-danger p-button-sm text-white"
                rejectClassName="p-button-outlined p-button-sm"
            />
            <Toast ref={toast} />
        </>
    );
}
