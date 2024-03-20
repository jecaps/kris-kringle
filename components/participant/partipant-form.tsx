"use client";

import { useFormState, useFormStatus } from "react-dom";
import { addParticipant } from "@/lib/actions";
import Btn from "../ui/button";

function SubmitBtn() {
    const { pending } = useFormStatus();

    return (
        <Btn isDisabled={pending}>{pending ? "Submitting..." : "Submit"}</Btn>
    );
}

export default function ParticipantForm() {
    const [state, formAction] = useFormState(addParticipant, undefined);

    return (
        <>
            <form action={formAction}>
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" />
                <label htmlFor="wishlist">
                    Wishlist <span>(example: books, pens, shoes)</span>
                </label>
                <input
                    type="text"
                    id="wishlist"
                    name="wishlist"
                    placeholder="separate items with a comma"
                />
                <SubmitBtn />
            </form>
            {state?.error && <p>{state.error}</p>}
        </>
    );
}
