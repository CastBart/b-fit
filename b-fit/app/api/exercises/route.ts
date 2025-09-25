// app/api/exercises/route.ts - get
import { NextRequest, NextResponse } from "next/server";
import { fetchUserExercisesDB } from "@/lib/db/exercise";
import { auth } from "@/auth";

export async function GET(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user || !session.user.id) {
      return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
    }
    const data = await fetchUserExercisesDB(session.user.id);
    return NextResponse.json(data, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message ?? "Failed to fetch exercise history." },
      { status: 500 }
    );
  }
}
