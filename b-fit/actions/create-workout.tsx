"use server";

import * as z from "zod";
import { db } from "@/lib/db";
import { auth } from "@/auth";
import { WorkoutSchema } from "@/schemas";
import { revalidatePath } from "next/cache";

export async function createWorkout(values: z.infer<typeof WorkoutSchema>) {
  try {
    const validatedData = WorkoutSchema.safeParse(values);
    if (!validatedData.success) {
      return { error: "Invalid workout data" };
    }

    const session = await auth();
    if (!session?.user?.id) {
      return { error: "Unauthorized: User not logged in" };
    }

    const userId = session.user.id;

    const workout = await db.workout.create({
      data: {
        name: validatedData.data.name,
        description: validatedData.data.description || null,
        userId: userId,
      },
    });

    // 🔹 Create WorkoutExercises in batch
    for (const exercise of validatedData.data.exercises) {
      await db.workoutExercise.create({
        data: {
          workoutId: workout.id,
          exerciseId: exercise.exerciseID,
          previousId: exercise.prevId || null,
          nextId: exercise.nextId || null,
        },
      });
    }

    revalidatePath(`/dashboard/workouts/${workout.id}`);

    return { success: "Workout created!", workout };
  } catch (error) {
    console.error("Error creating workout:", error);
    return { error: "Something went wrong. Please try again." };
  }
}
