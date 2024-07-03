"use client";

import Btn from "../ui/button";
import clsx from "clsx";
import { useFormStatus } from "react-dom";
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
    closeDialog,
    error,
    dispatch,
}: {
    closeDialog: any;
    error: any;
    dispatch: any;
}) {
    return (
        <>
            <form className="grid" action={dispatch}>
                <div className="col-6 flex flex-column gap-2">
                    <label
                        htmlFor="name"
                        className={clsx("text-sm", error && "text-red-600")}
                    >
                        Name
                    </label>
                    <InputText
                        type="text"
                        id="name"
                        name="name"
                        className={clsx(error && "p-invalid focus:shadow-none")}
                    />
                </div>
                <div className="col-6 flex flex-column gap-2">
                    <label
                        htmlFor="email"
                        className={clsx("text-sm", error && "text-red-600")}
                    >
                        Email
                    </label>
                    <InputText
                        type="email"
                        id="email"
                        name="email"
                        className={clsx(error && "p-invalid focus:shadow-none")}
                    />
                </div>
                <div className="col-12 flex flex-column gap-2">
                    <label
                        htmlFor="wishlist"
                        className={clsx("text-sm", error && "text-red-600")}
                    >
                        Wishlist
                    </label>
                    <InputText
                        type="text"
                        id="wishlist"
                        name="wishlist"
                        placeholder="example: books, pens, shoes"
                        className={clsx(error && "p-invalid focus:shadow-none")}
                    />
                </div>
                <div className="col-12 flex flex-column gap-2">
                    {error && (
                        <p className="text-xs text-red-400 m-0">{error}</p>
                    )}

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
                </div>
            </form>
        </>
    );
}
