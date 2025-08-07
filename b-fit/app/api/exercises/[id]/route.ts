// app/api/exercises/[id]/history/route.ts
import { NextRequest, NextResponse } from "next/server";
import { fetchExercise } from "@/actions/fetch-exercise";
import { fetchExerciseHistoryDB } from "@/lib/db/exercise";
import { auth } from "@/auth";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    if (!id) {
      return NextResponse.json(
        { error: "Exercise ID is required." },
        { status: 400 }
      );
    }
    const session = await auth();
    if (!session?.user || !session.user.id) {
      return { error: "Unauthorised" };
    }
    const data = await fetchExerciseHistoryDB(id, session.user.id);
    return NextResponse.json(data, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message ?? "Failed to fetch exercise history." },
      { status: 500 }
    );
  }
}
