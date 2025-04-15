// app/api/exercises/route.ts

import { NextResponse } from "next/server";
import { createExercise } from "@/actions/create-exercise";
import { CreateExerciseSchema } from "@/schemas";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Validate input using your schema
    const parsed = CreateExerciseSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid exercise data." },
        { status: 400 }
      );
    }

    // Create exercise using server action
    const result = await createExercise(parsed.data);

    if (result?.error) {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }

    return NextResponse.json({ exercise: result.exercise }, { status: 201 });
  } catch (error) {
    console.error("[EXERCISE_POST]", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
