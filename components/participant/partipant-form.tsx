"use client";

import { useFormState } from "react-dom";
import { useEffect, useState } from "react";
import { addParticipant } from "@/lib/actions";

export default function ParticipantForm() {
    const [state, formAction] = useFormState(addParticipant, undefined);
    const [name, setName] = useState("");
    const [wishlist, setWishlist] = useState("");

    useEffect(() => {
        if (state?.resetForm) {
            setName("");
            setWishlist("");
        }
    }, [state?.resetForm]);

    return (
        <>
            <form action={formAction}>
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <label htmlFor="wishlist">
                    Wishlist <span>(example: books, pens, shoes)</span>
                </label>
                <input
                    type="text"
                    id="wishlist"
                    name="wishlist"
                    placeholder="separate items with a comma"
                    value={wishlist}
                    onChange={(e) => setWishlist(e.target.value)}
                />
                <button>Submit</button>
            </form>
            {state?.error && <p>{state.error}</p>}
        </>
    );
}
