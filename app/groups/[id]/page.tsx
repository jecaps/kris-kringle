import ParticipantsList from "@/components/participants/participants-list";
import { fetchGroup } from "@/lib/data";
import { ShuffleButton } from "@/components/groups/buttons";

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
                <h1 className="md:text-6xl m-0">{group?.name}</h1>
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
                <ShuffleButton id={params.id} />
                {group?.participants.length ? (
                    <p className="text-gray-400 text-sm">
                        Here are all the amazing people participating in our
                        gift exchange!
                    </p>
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
