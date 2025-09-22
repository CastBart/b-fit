import { deleteWorkout } from "@/actions/delete-workout";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  props: { params: Promise<{ id: string }> }
) {
  const params = await props.params;

  try {
    const deletedId = await deleteWorkout(params.id);
    return NextResponse.json({ id: deletedId });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message ?? "Failed to delete workout" },
      { status: 400 }
    );
  }
}
