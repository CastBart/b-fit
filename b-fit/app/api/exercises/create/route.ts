// app/api/exercises/route.ts

import { NextResponse } from "next/server";
import { createExerciseDB } from "@/lib/db/exercise";
import { auth } from "@/auth";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    // Ensure the user is authenticated
    const session = await auth();
    const userId = session?.user?.id;
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    const result = await createExerciseDB(body, userId); // Replace with actual user ID from session or context

    if ("error" in result) {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }

    return NextResponse.json(
      {
        exercise: {
          exerciseName: result.name,
          equipment: result.equipment,
          primaryMuscle: result.primaryMuscle,
          auxiliaryMuscles: result.auxiliaryMuscles,
          exerciseType: result.exerciseType,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[EXERCISE_CREATE]", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
