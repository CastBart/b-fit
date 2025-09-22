import { completeSession, SessionInput } from "@/actions/session-complete";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data: SessionInput = await req.json();
    const session = await completeSession(data);
    return NextResponse.json(session, { status: 200 });
  } catch (error: any) {
    console.error("[SESSION_COMPLETE_API_ERROR]", error);
    const status = error.message === "Unauthorized" ? 401 : 400;
    return NextResponse.json({ error: error.message }, { status });
  }
}
