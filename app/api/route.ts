import { assignSanta, getParticipants } from "@/lib/actions";
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
    const msg = await assignSanta();
    return NextResponse.json(
        {
            message: msg,
        },
        {
            status: 201,
        }
    );
}
