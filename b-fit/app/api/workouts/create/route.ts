// /app/api/workouts/create/route.ts - post
import { createWorkout } from "@/actions/create-workout";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const workout = await createWorkout(body);
    return NextResponse.json({ workout });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message ?? "Failed to create workout" },
      { status: 400 }
    );
  }
}
