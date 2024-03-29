import { createSanta } from "@/lib/actions";
import { getParticipants } from "@/lib/data";
import { NextResponse } from "next/server";

export async function GET() {
    const participants = await getParticipants();
    return NextResponse.json(
        {
            result: participants,
        },
        {
            status: 201,
        }
    );
}

export async function POST() {
    const msg = await createSanta();
    return NextResponse.json(
        {
            message: msg,
        },
        {
            status: 201,
        }
    );
}
