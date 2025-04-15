import { createWorkout } from "@/actions/create-workout";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = await createWorkout(body);

    if (result.error) {
      return new Response(JSON.stringify({ error: result.error }), { status: 400 });
    }

    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Unexpected error" }), { status: 500 });
  }
}
