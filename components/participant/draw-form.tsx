"use client";

import { useFormState } from "react-dom";
import { drawName } from "@/lib/actions";
import { useState, useEffect } from "react";
import Button from "@/components/ui/button";

export default function DrawForm() {
    const [state, formAction] = useFormState(drawName, undefined);
    const [enteredName, setEnteredName] = useState("");
    const { name, wishlist } = state?.response || {};

    useEffect(() => {
        if (state?.resetForm) {
            setEnteredName("");
        }
    }, [state?.resetForm]);

    return (
        <div>
            <h1>Find out who you are giving a gift to!</h1>
            <form action={formAction}>
                <label htmlFor="name">Enter Your Name</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={enteredName}
                    onChange={(e) => setEnteredName(e.target.value)}
                />
                <Button disabled={state?.resetForm}>Draw Name</Button>
            </form>
            {state?.error && <p>{state.error}</p>}
            {name && (
                <>
                    <p>You drew:</p>
                    <h2>{name}!</h2>
                </>
            )}
            {wishlist && (
                <>
                    <p>{name}&apos;s wishlist:</p>
                    <ul>
                        {wishlist.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    );
}
