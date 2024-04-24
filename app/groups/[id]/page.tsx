import ParticipantsList from "@/components/participants/participants-list";
import { fetchGroup } from "@/lib/data";
import { SettingsButton, ShuffleButton } from "@/components/groups/buttons";

export default async function GroupPage({
    params,
}: {
    params: { id: string };
}) {
    const group = await fetchGroup(params.id);

    return (
        <div className="flex flex-column align-items-center justify-content-center w-full h-screen gap-6">
            <div
                className="flex flex-column justify-content-end"
                style={{ height: "16.67" }}
            >
                <div className="relative">
                    <h1 className="md:text-6xl m-0 text-center">
                        {group?.name}
                    </h1>
                    <SettingsButton id={params.id} />
                </div>
                <div className="grid text-center">
                    <span className="col-6 pi pi-gift"></span>
                    <span className="col-6 pi pi-calendar"></span>
                    <p className="col-6 p-0 m-0 text-gray-400 text-xs">
                        Amount: {group?.budget}
                    </p>
                    <p className="col-6 p-0 m-0 text-gray-400 text-xs">
                        Date: {group?.dateOfExchange}
                    </p>
                </div>
            </div>
            <div className="md:w-6 mx-auto">
                <h2 className="md:text-4xl m-0">Participants</h2>
                {group?.participants.length ? (
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
                    participants={group?.participants}
                />
            </div>
        </div>
    );
}
