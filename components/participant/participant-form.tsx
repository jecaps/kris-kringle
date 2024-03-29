"use client";

import Btn from "../ui/button";
import { useFormState, useFormStatus } from "react-dom";
import { createParticipant } from "@/lib/actions";
import { InputText } from "primereact/inputtext";

function SubmitBtn() {
    const { pending } = useFormStatus();

    return <Btn loading={pending}>{pending ? " Submitting..." : "Submit"}</Btn>;
}

export default function ParticipantForm() {
    const [state, formAction] = useFormState(createParticipant, undefined);

    return (
        <div className="surface-0 p-4 shadow-2 border-round w-5 m-auto text-left">
            <form className="flex flex-column gap-3" action={formAction}>
                <div className="flex flex-column gap-2">
                    <label
                        htmlFor="name"
                        className={
                            state?.error.name_error ? "text-red-600" : ""
                        }
                    >
                        Enter your name
                    </label>
                    <InputText
                        type="text"
                        id="name"
                        name="name"
                        className={state?.error.name_error ? "p-invalid" : ""}
                    />
                    {state?.error.name_error && (
                        <p className="text-xs text-red-400 m-0">
                            {state.error.name_error}
                        </p>
                    )}
                </div>

                <div className="flex flex-column gap-2">
                    <label
                        htmlFor="wishlist"
                        className={
                            state?.error.wishlist_error ? "text-red-600" : ""
                        }
                    >
                        Enter your wishlist
                    </label>
                    <InputText
                        type="text"
                        id="wishlist"
                        name="wishlist"
                        placeholder="example: books, pens, shoes"
                        className={
                            state?.error.wishlist_error ? "p-invalid" : ""
                        }
                    />
                    {state?.error.wishlist_error && (
                        <p className="text-xs text-red-400 m-0">
                            {state.error.wishlist_error}
                        </p>
                    )}
                </div>

                <div className="m-auto">
                    <SubmitBtn />
                </div>
            </form>
        </div>
    );
}
