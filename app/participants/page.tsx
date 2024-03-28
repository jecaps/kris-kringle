"use client";

import ParticipantsList from "@/components/participant/participants-list";
import Btn from "@/components/ui/button";

import { useRef, useState } from "react";
import { Toast } from "primereact/toast";
import { Divider } from "primereact/divider";

export default function ParticipantsPage() {
    const toast = useRef<Toast>(null);

    const [message, setMessage] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    async function shuffleHandler() {
        setIsLoading(true);
        const res = await fetch("/api", {
            method: "POST",
        });
        const data = await res.json();
        setMessage(data.message);
        setIsLoading(false);
    }

    function copyLinkHandler() {
        navigator.clipboard.writeText(
            window.location.origin + "/add-participant"
        );
        if (toast.current) {
            toast.current.show({
                severity: "success",
                detail: "Link copied. Share with your friends!",
                life: 5000,
            });
        }
    }

    return (
        <>
            <div className="flex flex-column justify-content-center text-center h-screen">
                <div
                    className="flex flex-column gap-6"
                    style={{ height: "75%" }}
                >
                    <div
                        className="flex flex-column justify-content-end"
                        style={{ height: "16.67" }}
                    >
                        <h1 className="text-6xl m-0">Participants</h1>
                        <p className="text-gray-400 text-sm">
                            Here are all the amazing people participating in our
                            gift exchange! Once everyone has joined, click the
                            shuffle button below to start the fun.
                        </p>
                    </div>
                    <div className="w-9 mx-auto" style={{ height: "auto" }}>
                        <ParticipantsList />
                    </div>
                    {!message ? (
                        <div className="" style={{ height: "16.67" }}>
                            <Btn loading={isLoading} onClick={shuffleHandler}>
                                {isLoading ? "Shuffling" : "Shuffle Names"}
                            </Btn>
                        </div>
                    ) : (
                        message && (
                            <div
                                className="flex flex-column justify-content-end gap-3"
                                style={{ height: "16.67" }}
                            >
                                <h2 className="m-0 text-primary text-3xl">
                                    Done!
                                </h2>
                                <p className="m-0 text-gray-400">{message}</p>
                            </div>
                        )
                    )}
                </div>

                <div className="flex flex-column gap-4 align-items-center">
                    <Divider />
                    <div className="flex justify-content-center align-items-center">
                        <div className="w-5">
                            <h5 className="m-0">Join the fun</h5>
                            <p className="text-gray-300 text-xs">
                                It&apos;s not too late to join the gift
                                exchange. Click the button below to add your
                                name to the list.
                            </p>
                            <div className="justify-items-center">
                                <Btn
                                    href="/add-participant"
                                    sizes="small"
                                    severity="help"
                                    rounded
                                >
                                    Join the Gift Exchange
                                </Btn>
                            </div>
                        </div>
                        <p className="text-xl w-2">OR</p>
                        <div className="w-5">
                            <h5 className="m-0">Invite Participant</h5>
                            <p className="text-gray-300 text-xs">
                                Know someone who would be interested? Invite
                                them to join the gift exchange by sharing the
                                link below.
                            </p>
                            <Btn
                                onClick={copyLinkHandler}
                                sizes="small"
                                severity="secondary"
                                rounded
                                outlined
                            >
                                Invite Participant
                            </Btn>
                        </div>
                    </div>
                </div>
            </div>

            <Toast ref={toast} />
        </>
    );
}
