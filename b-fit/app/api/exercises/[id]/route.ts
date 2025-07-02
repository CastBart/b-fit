// app/api/exercises/[id]/history/route.ts
import { NextRequest, NextResponse } from "next/server";
import { fetchExercise } from "@/actions/fetch-exercise";

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

    const data = await fetchExercise(id);
    return NextResponse.json(data, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message ?? "Failed to fetch exercise history." },
      { status: 500 }
    );
  }
}
