"use client";

import { useFormStatus } from "react-dom";
import { deleteParticipant } from "@/lib/data";
import { OverlayPanel } from "primereact/overlaypanel";
import { Button } from "primereact/button";

function FormButtons({ clickHandler }: { clickHandler: any }) {
    const { pending } = useFormStatus();

    return (
        <>
            <Button
                type="button"
                className=""
                size="small"
                onClick={clickHandler}
                outlined
                autoFocus
                disabled={pending}
            >
                No
            </Button>
            <Button
                loading={pending}
                type="submit"
                className="justify-content-center gap-1 bg-red-600 border-red-600 text-white"
                size="small"
            >
                {pending ? "Deleting" : "Yes"}
            </Button>
        </>
    );
}

export default function DeleteParticipant({
    groupId,
    participant,
    reference,
}: {
    groupId: string;
    participant: any;
    reference: any;
}) {
    const deleteGroupParticipant = deleteParticipant.bind(null, groupId);
    const removeParticipant = deleteGroupParticipant.bind(
        null,
        participant?.id
    );

    return (
        <OverlayPanel className="m-0 py-0" ref={reference}>
            <p className="my-1 mx-auto">
                Are you sure you want to remove {participant?.name} from this
                group?
            </p>
            <form
                className="flex justify-content-end gap-2"
                action={removeParticipant}
            >
                <FormButtons
                    clickHandler={(e: EventListener) =>
                        reference.current.toggle(e)
                    }
                />
            </form>
        </OverlayPanel>
    );
}
