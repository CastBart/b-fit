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
    const exercises = validatedData.data.exercises;

    // Use transaction here
    const workout = await db.$transaction(async (tx) => {
      // 1. Create workout
      const workout = await tx.workout.create({
        data: {
          name: validatedData.data.name,
          description: validatedData.data.description || null,
          userId: userId,
        },
      });

      // 2. Create exercises (no prev/next)
      const createdWorkoutExercises = await Promise.all(
        exercises.map((node) =>
          tx.workoutExercise.create({
            data: {
              workoutId: workout.id,
              exerciseId: node.exerciseID,
            },
          })
        )
      );

      // 3. Map instanceId → created DB id
      const instanceIdToDbId: Record<string, string> = {};
      exercises.forEach((node, idx) => {
        instanceIdToDbId[node.instanceId] = createdWorkoutExercises[idx].id;
      });

      // 4. Update prev/next connections
      await Promise.all(
        exercises.map((node) =>
          tx.workoutExercise.update({
            where: { id: instanceIdToDbId[node.instanceId] },
            data: {
              previousId: node.prevId ? instanceIdToDbId[node.prevId] : null,
              nextId: node.nextId ? instanceIdToDbId[node.nextId] : null,
            },
          })
        )
      );

      // 5. Return workout (created)
      return workout;
    });

    return { success: "Workout created!", workout };
  } catch (error) {
    console.error("Error creating workout:", error);
    return { error: "Something went wrong. Please try again." };
  }
}
