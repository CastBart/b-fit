import { NextResponse } from "next/server";
import { db } from "@/lib/db/db";
import { auth } from "@/auth";
import { ExerciseOwnership } from "@/lib/definitions";

export async function DELETE(req: Request, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const exerciseId = params.id;
    // check ownership before deleting
    const exercise = await db.exercise.findUnique({ where: { id: exerciseId } });
    if (!exercise || exercise.userId !== session.user.id || exercise.ownership === ExerciseOwnership.BFit) {
      return NextResponse.json({ error: "Not found or forbidden" }, { status: 404 });
    }

    await db.exercise.delete({ where: { id: exerciseId } });
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("[EXERCISE_DELETE]", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}