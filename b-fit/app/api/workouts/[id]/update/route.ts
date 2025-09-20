import { updateWorkout } from "@/actions/update-workout";
import { NextResponse } from "next/server";

export async function POST(req: Request, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  const body = await req.json();

  const result = await updateWorkout(id, body);

  if ("error" in result) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  return NextResponse.json(result);
}
