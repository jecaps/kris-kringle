"use client";

import Btn from "../ui/button";
import { useFormState, useFormStatus } from "react-dom";
import { createParticipant } from "@/lib/actions";
import { InputText } from "primereact/inputtext";

function SubmitBtn() {
    const { pending } = useFormStatus();

    return (
        <Btn
            className="justify-content-center gap-2"
            size="small"
            loading={pending}
            rounded
        >
            {pending ? "Submitting" : "Submit"}
        </Btn>
    );
}

export default function CreateParticipantForm({
    id,
    closeDialog,
}: {
    id: string;
    closeDialog: any;
}) {
    const createParticipantToGroup = createParticipant.bind(null, id);
    const [state, dispatch] = useFormState(createParticipantToGroup, undefined);

    return (
        <>
            <form className="grid" action={dispatch}>
                <div className="col-6 flex flex-column gap-2">
                    <label
                        htmlFor="name"
                        className={`${
                            state?.error ? "text-red-600" : ""
                        } text-sm`}
                    >
                        Name
                    </label>
                    <InputText
                        type="text"
                        id="name"
                        name="name"
                        className={state?.error ? "p-invalid" : ""}
                        disabled={state?.message ? true : false}
                    />
                </div>
                <div className="col-6 flex flex-column gap-2">
                    <label
                        htmlFor="email"
                        className={`${
                            state?.error ? "text-red-600" : ""
                        } text-sm`}
                    >
                        Email
                    </label>
                    <InputText
                        type="email"
                        id="email"
                        name="email"
                        className={state?.error ? "p-invalid" : ""}
                        disabled={state?.message ? true : false}
                    />
                </div>
                <div className="col-12 flex flex-column gap-2">
                    <label
                        htmlFor="wishlist"
                        className={`${
                            state?.error ? "text-red-600" : ""
                        } text-sm`}
                    >
                        Wishlist
                    </label>
                    <InputText
                        type="text"
                        id="wishlist"
                        name="wishlist"
                        placeholder="example: books, pens, shoes"
                        className={state?.error ? "p-invalid" : ""}
                        disabled={state?.message ? true : false}
                    />
                </div>
                <div className="col-12 flex flex-column gap-2">
                    {state?.error && (
                        <p className="text-xs text-red-400 m-0">
                            {state.error}
                        </p>
                    )}
                    {state?.message ? (
                        <div className="mx-auto text-center">
                            <h3 className="text-green-400 m-0">
                                {state.message}
                            </h3>
                            <Btn
                                className="w-6 mt-2 justify-content-center"
                                onClick={closeDialog}
                                size="small"
                                rounded
                                outlined
                            >
                                Close
                            </Btn>
                        </div>
                    ) : (
                        <div className="flex gap-2 mx-auto">
                            <Btn
                                onClick={closeDialog}
                                size="small"
                                rounded
                                outlined
                            >
                                Cancel
                            </Btn>
                            <SubmitBtn />
                        </div>
                    )}
                </div>
            </form>
        </>
    );
}
