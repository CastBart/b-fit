// /app/api/workouts/route.ts - get
import { NextResponse } from "next/server";
import { fetchUserWorkouts } from "@/actions/fetch-user-workouts";

export async function GET() {
  try {
    const workouts = await fetchUserWorkouts();

    // If no workouts, it could mean user is not authenticated
    if (!workouts.length) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    return NextResponse.json(workouts, {status: 200});
  } catch (error) {
    // console.error("Fetch workouts error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
