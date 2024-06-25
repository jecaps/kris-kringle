"use client";

import { useFormStatus } from "react-dom";
import { InputText } from "primereact/inputtext";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import clsx from "clsx";

function InputPassword({ s }: { s: any }) {
    const { pending } = useFormStatus();

    return (
        <>
            <InputIcon
                className={clsx(
                    "pi",
                    pending ? "pi-spin pi-spinner" : "pi-lock"
                )}
            />
            <InputText
                className={clsx(
                    "p-inputtext-sm focus:shadow-none",
                    s?.error && "border border-red-600"
                )}
                placeholder="Enter Group Password"
                id="enteredPassword"
                name="enteredPassword"
                type="password"
                autoFocus
            />
        </>
    );
}

export default function SubmitPassword({
    state,
    formAction,
}: {
    state: any;
    formAction: any;
}) {
    return (
        <div className="flex flex-column">
            <small
                style={{
                    visibility: state?.error ? "visible" : "hidden",
                    height: "30%",
                }}
                className="text-red-600 text-xs pl-1"
            >
                {state?.error}
            </small>
            <form action={formAction}>
                <IconField iconPosition="left">
                    <InputPassword s={state} />
                </IconField>
            </form>
        </div>
    );
}
