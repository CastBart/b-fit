"use server";

import * as z from "zod";
import { db } from "@/lib/db";
import { auth } from "@/auth";
import { WorkoutSchema } from "@/schemas";
import { revalidatePath } from "next/cache";

export async function createWorkout(values: z.infer<typeof WorkoutSchema>) {
  try {
    // 🔹 Validate input using Zod schema
    const validatedData = WorkoutSchema.safeParse(values);
    if (!validatedData.success) {
      return { error: "Invalid workout data" };
    }

    const session = await auth();
    if (!session?.user?.id) {
      return { error: "Unauthorized: User not logged in" };
    }

    const userId = session.user.id;

    // 🔹 Create workout first
    const workout = await db.workout.create({
      data: {
        name: validatedData.data.name,
        description: validatedData.data.description || null,
        userId: userId, // ✅ Ensure userId is always a string
      },
    });

    // 🔹 Now link the exercises in `WorkoutExercise`
    if (validatedData.data.exercises.length > 0) {
      await db.workoutExercise.createMany({
        data: validatedData.data.exercises.map((exercise) => ({
          workoutId: workout.id, // ✅ Link to the newly created workout
          exerciseId: exercise.id, // ✅ Link to existing exercises
        })),
      });
    }

    revalidatePath("/dashboard/workouts"); // ✅ Refresh workouts list

    return { success: "Workout created!", workout };
  } catch (error) {
    console.error("Error creating workout:", error);
    return { error: "Something went wrong. Please try again." };
  }
}
