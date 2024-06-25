import { fetchGroup } from "@/lib/data";
import { notFound } from "next/navigation";
import Group from "@/components/groups/group";

export default async function GroupPage({
    params,
}: {
    params: { id: string };
}) {
    const group = await fetchGroup(params.id);

    if (!group) {
        notFound();
    }

    return <Group group={group} />;
}
