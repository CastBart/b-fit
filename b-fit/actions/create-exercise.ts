"use server";

import * as z from "zod";
import { CreateExerciseSchema } from "@/schemas";
import { auth } from "@/auth"; // Authentication setup
import { createExerciseDB } from "@/lib/db/exercise";

export async function createExercise(
  values: z.infer<typeof CreateExerciseSchema>
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      throw new Error("You must be logged in to create an exercise.");
    }
    const result = await createExerciseDB(values, session.user.id); // Use the user ID from the session

    
    return result;
  } catch (error) {
    console.error("Error creating exercise:", error);
    return { error: "Failed to create exercise." };
  }
}
