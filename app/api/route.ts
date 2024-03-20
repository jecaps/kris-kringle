import { assignSanta } from "@/lib/actions";
import { NextResponse } from "next/server";

export async function GET() {
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
