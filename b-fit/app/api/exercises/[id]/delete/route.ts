// app/api/exercises/[id]/delete/route.ts - delete
import { deleteExercise } from "@/actions/delete-exercise";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  props: { params: Promise<{ id: string }> }
) {
  const params = await props.params;

  try {
    const deletedId = await deleteExercise(params.id);
    return NextResponse.json({ id: deletedId }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message ?? "Failed to delete exercise" },
      { status: 400 }
    );
  }
}
