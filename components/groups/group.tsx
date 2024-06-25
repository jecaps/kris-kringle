"use client";

import { useFormState } from "react-dom";
import { checkPassword } from "@/lib/data";
import { JoinGroupButton, ShareLinkButton, ShuffleButton } from "./buttons";
import ParticipantsList from "../participants/participants-list";
import GroupHeader from "./header";
import SubmitPassword from "./submit-password";

export default function Group({ group }: { group: any }) {
    const initialState = { error: "", response: false };

    const passwordMatcher = checkPassword.bind(null, group.id);
    const [state, formAction] = useFormState(passwordMatcher, initialState);

    return (
        <div className="flex flex-column align-items-center justify-content-center w-full h-screen gap-6">
            <GroupHeader hasPassword={state.response} group={group} />
            <div className="md:w-6 mx-auto">
                <h2 className="md:text-4xl m-0">Participants</h2>

                {group.participants.length ? (
                    <>
                        <div className="md:flex md:justify-content-between md:h-4rem">
                            <p className="text-gray-400 text-sm my-auto">
                                Here are all the amazing people participating in
                                our gift exchange!
                            </p>

                            {state.response ? (
                                <ShuffleButton id={group.id} />
                            ) : (
                                <SubmitPassword
                                    state={state}
                                    formAction={formAction}
                                />
                            )}
                        </div>
                        <ParticipantsList
                            id={group.id}
                            participants={group.participants}
                            hasPassword={state.response}
                        />
                        <div className="flex flex-column align-items-center w-full">
                            <p className="text-sm">
                                It&apos;s not too late to join the gift
                                exchange. Add your name to the list now!
                            </p>
                            <JoinGroupButton id={group.id} />
                        </div>
                        <div className="flex flex-column align-items-center w-full">
                            <p className="text-sm">
                                Know someone who would be interested? Invite
                                them to join the gift exchange by clicking the
                                share link button below.
                            </p>
                            <ShareLinkButton id={group.id} />
                        </div>
                    </>
                ) : (
                    <>
                        <p className="text-gray-400 text-sm">
                            No Participants yet. You can either join the group
                            or share the link others can join the Gift Exchange
                            too!
                        </p>
                        <div className="flex justify-content-center gap-2">
                            <JoinGroupButton id={group.id} />
                            <ShareLinkButton id={group.id} />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
