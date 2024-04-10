"use client";

import Btn from "@/components/ui/button";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Calendar } from "primereact/calendar";
import { useFormState, useFormStatus } from "react-dom";
import { createGroup } from "@/lib/actions";
import { Password } from "primereact/password";

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
                className="grid w-6 mx-auto text-left border-round"
            >
                <div className="col-12">
                    <label
                        htmlFor="name"
                        className={`${
                            state?.error ? "text-red-600" : ""
                        } block mb-2 text-sm`}
                    >
                        Group Name
                    </label>
                    <InputText
                        className={`${state?.error ? "p-invalid" : ""} w-full`}
                        name="name"
                        id="name"
                    />
                </div>
                <div className="col-6">
                    <label
                        htmlFor="password"
                        className={`${
                            state?.error ? "text-red-600" : ""
                        } block mb-2 text-sm`}
                    >
                        Password
                    </label>
                    <Password
                        className={`${state?.error ? "p-invalid" : ""}`}
                        inputStyle={{ width: "100%" }}
                        style={{ width: "100%" }}
                        name="password"
                        id="password"
                        feedback={false}
                        toggleMask
                    />
                </div>
                <div className="col-6">
                    <label
                        htmlFor="reenterPassword"
                        className={`${
                            state?.error ? "text-red-600" : ""
                        } block mb-2 text-sm`}
                    >
                        Reenter Password
                    </label>
                    <Password
                        className={`${state?.error ? "p-invalid" : ""}`}
                        inputStyle={{ width: "100%" }}
                        style={{ width: "100%" }}
                        name="reenterPassword"
                        id="reenterPassword"
                        feedback={false}
                        toggleMask
                    />
                </div>
                <div className="col-6">
                    <label
                        htmlFor="budget"
                        className={`${
                            state?.error ? "text-red-600" : ""
                        } block mb-2 text-sm`}
                    >
                        Budget for Gift
                    </label>
                    <InputNumber
                        className={`${state?.error ? "p-invalid" : ""} w-full`}
                        name="budget"
                        id="budget"
                        locale="en-US"
                    />
                </div>
                <div className="col-6">
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
