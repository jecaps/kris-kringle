"use client";

import { useState } from "react";
import Btn from "./ui/button";
import Link from "next/link";

export default function Content({ children }: { children: React.ReactNode }) {
    const [message, setMessage] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    async function handleButtonClick() {
        setIsLoading(true);
        const res = await fetch("/api", {
            method: "GET",
        });
        const data = await res.json();
        setMessage(data.message);
        setIsLoading(false);
    }

    return (
        <>
            <h2>Participants</h2>
            {children}
            {!message && (
                <Btn isDisabled={isLoading} onClick={handleButtonClick}>
                    {isLoading ? "Shuffling..." : "Shuffle Names"}
                </Btn>
            )}
            {message && (
                <>
                    <p>{message}</p>
                    <Btn link="/draw-name">Draw Name</Btn>
                </>
            )}
            <p>
                Name not on the list? Click{" "}
                <Link href="/add-participant">here</Link> to join the exchanging
                of gifts!
            </p>
        </>
    );
}
