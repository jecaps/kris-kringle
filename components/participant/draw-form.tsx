"use client";

import { useFormState } from "react-dom";
import { drawName } from "@/lib/actions";

export default function DrawForm() {
    const [state, formAction] = useFormState(drawName, undefined);

    return (
        <div>
            <form action={formAction}>
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" />
                <button>Draw Name</button>
            </form>
            {state?.error && <p>{state.error}</p>}
            {state?.name && <p>{state.name}</p>}
        </div>
    );
}
