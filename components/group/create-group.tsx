"use client";

import Btn from "@/components/ui/button";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Calendar } from "primereact/calendar";
import { useFormState, useFormStatus } from "react-dom";
import { createGroup } from "@/lib/actions";

function SubmitBtn() {
    const { pending } = useFormStatus();

    return (
        <Btn className="w-6 mx-auto" loading={pending}>
            {pending ? " Creating" : "Create"}
        </Btn>
    );
}

export default function CreateGroupForm() {
    const [state, formAction] = useFormState(createGroup, undefined);

    return (
        <>
            <form
                action={formAction}
                className="flex flex-column gap-4 p-6 w-6 mx-auto text-left border-round"
            >
                <div className="flex gap-2">
                    <div className="w-6">
                        <label
                            htmlFor="groupName"
                            className={`${
                                state?.error ? "text-red-600" : ""
                            } block mb-2 text-sm`}
                        >
                            Group Name
                        </label>
                        <InputText
                            className={`${
                                state?.error ? "p-invalid" : ""
                            } w-full`}
                            name="groupName"
                            id="groupName"
                        />
                    </div>
                    <div className="w-6">
                        <label
                            htmlFor="giftBudget"
                            className={`${
                                state?.error ? "text-red-600" : ""
                            } block mb-2 text-sm`}
                        >
                            Budget for Gift
                        </label>
                        <InputNumber
                            className={`${
                                state?.error ? "p-invalid" : ""
                            } w-full`}
                            name="giftBudget"
                            id="giftBudget"
                            locale="en-US"
                        />
                    </div>
                </div>
                <div>
                    <label
                        htmlFor="exchangeDate"
                        className={`${
                            state?.error ? "text-red-600" : ""
                        } block mb-2 text-sm`}
                    >
                        Date of Exchanging Gifts
                    </label>
                    <Calendar
                        name="exchangeDate"
                        id="exchangeDate"
                        className={`${state?.error ? "p-invalid" : ""} w-full`}
                        showIcon
                        placeholder="dd/mm/yy"
                        dateFormat="dd/mm/yy"
                    />
                </div>
                <SubmitBtn />
            </form>

            {state?.error && (
                <p className="text-red-500 text-xs">{state.error}</p>
            )}
        </>
    );
}
