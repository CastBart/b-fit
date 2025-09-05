// app/api/sessions/route.ts
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { fetchAllSessionsDB } from "@/lib/db/session";

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await fetchAllSessionsDB(session.user.id);

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("[SESSIONS_FETCH_API_ERROR]", error);
    return NextResponse.json(
      { error: "Failed to fetch sessions" },
      { status: 500 }
    );
  }
}
