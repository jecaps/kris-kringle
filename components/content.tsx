"use client";

import { useState } from "react";
import Button from "./ui/button";

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
            {children}
            {!message && (
                <Button isDisabled={isLoading} onClick={handleButtonClick}>
                    {isLoading ? "Shuffling..." : "Shuffle Names"}
                </Button>
            )}
            {message && (
                <>
                    <p>{message}</p>
                    <Button link="/draw-name">Draw Name</Button>
                </>
            )}
        </>
    );
}
