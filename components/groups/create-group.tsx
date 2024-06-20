"use client";

import { useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { Password } from "primereact/password";
import { createGroup } from "@/lib/actions";
import Btn from "@/components/ui/button";

function SubmitBtn() {
    const { pending } = useFormStatus();

    return (
        <Btn className="w-6 mx-auto justify-content-center" loading={pending}>
            {pending ? " Creating" : "Create"}
        </Btn>
    );
}

export default function CreateGroupForm() {
    const [state, formAction] = useFormState(createGroup, undefined);
    const [password, setPassword] = useState("");
    const [reenterPassword, setReenterPassword] = useState("");

    return (
        <div className="flex flex-column">
            <form
                action={formAction}
                className="grid w-6 mx-auto text-left border-round"
                style={{ height: "80%" }}
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
                        className={`${
                            state?.error ||
                            (password !== reenterPassword &&
                                reenterPassword &&
                                "p-invalid")
                        }`}
                        inputStyle={{ width: "100%" }}
                        style={{ width: "100%" }}
                        name="password"
                        id="password"
                        feedback={false}
                        toggleMask
                        onChange={(e) => setPassword(e.target.value)}
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
                        className={`${
                            state?.error ||
                            (password !== reenterPassword &&
                                reenterPassword &&
                                "p-invalid")
                        }`}
                        inputStyle={{ width: "100%" }}
                        style={{ width: "100%" }}
                        name="reenterPassword"
                        id="reenterPassword"
                        feedback={false}
                        toggleMask
                        onChange={(e) => {
                            setReenterPassword(e.target.value);
                        }}
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
                    <InputText
                        keyfilter="int"
                        className={`${state?.error ? "p-invalid" : ""} w-full`}
                        name="budget"
                        id="budget"
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
                <p className="text-red-500 text-xs" style={{ height: "10%" }}>
                    {state.error}
                </p>
            )}
            {reenterPassword && password !== reenterPassword && (
                <div
                    className="col-12 text-sm text-red-600"
                    style={{ height: "10%" }}
                >
                    Passwords do not match
                </div>
            )}
        </div>
    );
}
