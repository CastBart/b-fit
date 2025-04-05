"use server";

import * as z from "zod";
import { db } from "@/lib/db";
import { auth } from "@/auth";
import { WorkoutSchema } from "@/schemas";
import { revalidatePath } from "next/cache";

export async function updateWorkout(values: z.infer<typeof WorkoutSchema>) {
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

    const tempIdToDbId: Record<string, string> = {};

    // First pass: create all exercises without prev/next
    for (const node of validatedData.data.exercises) {
      const created = await db.workoutExercise.create({
        data: {
          workoutId: workout.id,
          exerciseId: node.exerciseID,
        },
      });

      tempIdToDbId[node.exerciseID] = created.id;
    }

    // Second pass: update with prev/next using mapped DB IDs
    for (const node of validatedData.data.exercises) {
      await db.workoutExercise.update({
        where: { id: tempIdToDbId[node.exerciseID] },
        data: {
          previousId: node.prevId ? tempIdToDbId[node.prevId] : null,
          nextId: node.nextId ? tempIdToDbId[node.nextId] : null,
        },
      });
    }

    revalidatePath(`/dashboard/workouts`);

    return { success: "Workout created!", workout };
  } catch (error) {
    console.error("Error creating workout:", error);
    return { error: "Something went wrong. Please try again." };
  }
}
