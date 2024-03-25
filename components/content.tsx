"use client";

import { useRef, useState } from "react";
import Btn from "./ui/button";
import Link from "next/link";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";

export default function Content({ children }: { children: React.ReactNode }) {
    const toast = useRef<Toast>(null);

    const [message, setMessage] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    async function handleButtonClick() {
        setIsLoading(true);
        const res = await fetch("/api", {
            method: "POST",
        });
        const data = await res.json();
        setMessage(data.message);
        setIsLoading(false);
    }

    function handleCopyLink() {
        navigator.clipboard.writeText(
            window.location.origin + "/add-participant"
        );
        if (toast.current) {
            toast.current.show({
                severity: "success",
                summary: "Success",
                detail: "Link copied to clipboard",
                life: 3000,
            });
        }
    }

    return (
        <>
            <div className="flex justify-content-between">
                <h2>Participants</h2>
                <div className="justify-items-center">
                    <Button onClick={handleCopyLink} outlined>
                        Invite Participant
                    </Button>
                </div>
            </div>
            <div className="flex flex-column gap-5">
                {children}

                <div className="flex flex-column align-items-center">
                    {!message ? (
                        <Btn loading={isLoading} onClick={handleButtonClick}>
                            {isLoading ? "Shuffling" : "Shuffle Names"}
                        </Btn>
                    ) : (
                        message && (
                            <>
                                <p className="m-1">{message}</p>
                                <Btn link="/draw-name">Draw Name</Btn>
                            </>
                        )
                    )}
                </div>

                <p className="text-xs m-0">
                    Name not on the list? Click{" "}
                    <Link
                        className="no-underline text-blue-400"
                        href="/add-participant"
                    >
                        here
                    </Link>{" "}
                    to join the exchanging of gifts!
                </p>
            </div>
            <Toast ref={toast} />
        </>
    );
}
