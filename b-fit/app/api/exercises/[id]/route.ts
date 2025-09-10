// app/api/exercises/[id]/history/route.ts
import { NextRequest, NextResponse } from "next/server";
import { fetchExerciseDB } from "@/lib/db/exercise";
import { auth } from "@/auth";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    if (!session?.user || !session.user.id) {
      return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
    }
    const { id } = params;
    if (!id) {
      return NextResponse.json(
        { error: "Exercise ID is required." },
        { status: 400 }
      );
    }
    const data = await fetchExerciseDB(id, session.user.id);
    if ("error" in data) {
      return NextResponse.json({ error: data.error }, { status: 404 });
    }

    const { exercise, history } = data;
    return NextResponse.json({ exercise, history }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message ?? "Failed to fetch exercise history." },
      { status: 500 }
    );
  }
}
