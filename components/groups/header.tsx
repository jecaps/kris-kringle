"use client";

import { Group } from "@prisma/client";
import { useEffect, useRef, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Calendar } from "primereact/calendar";
import { Toast } from "primereact/toast";
import { updateGroup } from "@/lib/data";
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

    const editName = updateGroup.bind(null, group.id);
    const [state, dispatch] = useFormState(editName, undefined);
    const [allowEdit, setAllowEdit] = useState(false);
    const [enteredDate, setEnteredDate] = useState<Date>();

    useEffect(() => {
        if (state) {
            setAllowEdit(false);
            toast.current?.show({
                severity: "success",
                detail: state.message,
                life: 3000,
            });
        }
    }, [state]);

    return (
        <>
            {!allowEdit ? (
                <div className="h-5rem">
                    <div className="relative">
                        <h1 className="m-0 mb-2 text-center">{name}</h1>
                        <Btn
                            className="absolute w-2rem h-2rem p-0"
                            style={{ right: "-2rem", top: "-1rem" }}
                            icon="pi pi-pencil"
                            size="small"
                            text
                            rounded
                            onClick={() => setAllowEdit(true)}
                        ></Btn>
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
            ) : (
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
                            onClick={() => setAllowEdit(false)}
                        />
                    </div>
                </form>
            )}

            <Toast ref={toast} />
        </>
    );
}
