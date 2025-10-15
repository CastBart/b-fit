// app/api/exercises/create/route.ts - post

import { NextResponse } from "next/server";
import { createExerciseDB } from "@/lib/db/exercise";
import { auth } from "@/auth";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("[EXERCISE_CREATE] Incoming data:", body);
    // Ensure the user is authenticated
    const session = await auth();
    const userId = session?.user?.id;
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const exercise = await createExerciseDB(body, userId); // Replace with actual user ID from session or context

    if ("error" in exercise) {
      return NextResponse.json({ error: exercise.error }, { status: 500 });
    }

    return NextResponse.json({ exercise }, { status: 201 });
  } catch (error) {
    console.error("[EXERCISE_CREATE]", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
