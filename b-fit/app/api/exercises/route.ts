// app/api/exercises/[id]/history/route.ts
import { NextRequest, NextResponse } from "next/server";
import {
  fetchExerciseHistoryDB,
  fetchUserExercisesDB,
} from "@/lib/db/exercise";
import { auth } from "@/auth";

export async function GET(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user || !session.user.id) {
      return { error: "Unauthorised" };
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
