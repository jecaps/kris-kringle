import { fetchGroup } from "@/lib/data";
import { ShuffleButton } from "@/components/groups/buttons";
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
                    <div className="flex justify-content-between">
                        <p className="text-gray-400 text-sm">
                            Here are all the amazing people participating in our
                            gift exchange!
                        </p>
                        <ShuffleButton id={params.id} />
                    </div>
                ) : (
                    <p className="text-gray-400 text-sm">
                        No Participants yet. Click join to join the group or you
                        can invite others by clicking the invite button below!
                    </p>
                )}
                <ParticipantsList
                    id={params.id}
                    participants={group.participants}
                />
            </div>
        </div>
    );
}
