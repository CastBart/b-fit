// /app/api/workouts/route.ts
import { NextResponse } from "next/server";
import { completeSession, SessionInput } from "@/actions/session-complete";

export async function POST(req: Request) {
  try {
    const data = await req.json()
    const session = await completeSession(data);

    return NextResponse.json(session, { status: 200 });
  } catch (error) {
    console.error("[SESSION_COMPLETE_API_ERROR]", error);

    const status = error instanceof Error && error.message === "Unauthorized" ? 401 : 500;
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unknown error" }, { status });
  }
}
