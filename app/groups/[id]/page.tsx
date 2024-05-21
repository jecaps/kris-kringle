import { fetchGroup } from "@/lib/data";
import { JoinGroupButton, ShareLinkButton, ShuffleButton } from "@/components/groups/buttons";
import ParticipantsList from "@/components/participants/participants-list";
import { notFound } from "next/navigation";
import GroupHeader from "@/components/groups/header";

export default async function GroupPage({
    params,
}: {
    params: { id: string };
}) {
    const group = await fetchGroup(params.id);

    if (!group) {
        notFound();
    }

    return (
        <div className="flex flex-column align-items-center justify-content-center w-full h-screen gap-6">
            <GroupHeader group={group} />
            <div className="md:w-6 mx-auto">
                <h2 className="md:text-4xl m-0">Participants</h2>
                {group.participants.length ? (
                    <>
                        <div className="flex justify-content-between">
                            <p className="text-gray-400 text-sm">
                                Here are all the amazing people participating in our
                                gift exchange!
                            </p>
                            <ShuffleButton id={params.id} />
                        </div>
                        <ParticipantsList
                            id={params.id}
                            participants={group.participants}
                            />
                        <div className="flex flex-column align-items-center w-full">
                            <p className="text-sm">
                                It&apos;s not too late to join the gift exchange. Add
                                your name to the list now!
                            </p>
                            <JoinGroupButton id={params.id} />
                        </div>
                        <div className="flex flex-column align-items-center w-full">
                            <p className="text-sm">
                                Know someone who would be interested? Invite them to
                                join the gift exchange by clicking the share link button below.
                            </p>
                            <ShareLinkButton id={params.id} />
                        </div>
                    </>
                ) : (
                    <>
                        <p className="text-gray-400 text-sm">
                            No Participants yet. You can either join the group or share the link others can join the Gift Exchange too!
                        </p>
                        <div className="flex justify-content-center gap-2">
                            <JoinGroupButton id={params.id} />
                            <ShareLinkButton id={params.id} />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
