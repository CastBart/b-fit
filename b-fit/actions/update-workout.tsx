"use server";

import * as z from "zod";
import { db } from "@/lib/db";
import { auth } from "@/auth";
import { WorkoutSchema } from "@/schemas";
import { revalidatePath } from "next/cache";

export async function updateWorkout(id: string, values: z.infer<typeof WorkoutSchema>) {
  try {
    const validated = WorkoutSchema.safeParse(values);
    if (!validated.success) {
      return { error: "Invalid workout data" };
    }

    const session = await auth();
    if (!session?.user?.id) {
      return { error: "Unauthorized: User not logged in" };
    }

    const userId = session.user.id;

    // ✅ Update workout metadata (name, description)
    const updatedWorkout = await db.workout.update({
      where: { id , userId: userId },
      data: {
        name: validated.data.name,
        description: validated.data.description || null,
      },
    });

    const currentWorkoutExercises = await db.workoutExercise.findMany({
      where: { workoutId: id },
    });

    const incomingExerciseIds = validated.data.exercises.map((e) => e.exerciseID);

    const toDelete = currentWorkoutExercises.filter(
      (e) => !incomingExerciseIds.includes(e.exerciseId)
    );

    // ✅ Delete removed exercises
    await db.workoutExercise.deleteMany({
      where: {
        id: { in: toDelete.map((e) => e.id) },
      },
    });

    // We'll map temp IDs to DB IDs for linking prev/next
    const tempIdToDbId: Record<string, string> = {};
    const dbIdToExerciseId: Record<string, string> = {};

    // ✅ Create missing exercises
    for (const node of validated.data.exercises) {
      const existing = currentWorkoutExercises.find((e) => e.exerciseId === node.exerciseID);
      if (existing) {
        // Already exists, store its ID
        tempIdToDbId[node.exerciseID] = existing.id;
        dbIdToExerciseId[existing.id] = node.exerciseID;
      } else {
        const created = await db.workoutExercise.create({
          data: {
            workoutId: id,
            exerciseId: node.exerciseID,
          },
        });
        tempIdToDbId[node.exerciseID] = created.id;
        dbIdToExerciseId[created.id] = node.exerciseID;
      }
    }

    // ✅ Update links (prev/next)
    for (const node of validated.data.exercises) {
      const dbId = tempIdToDbId[node.exerciseID];
      await db.workoutExercise.update({
        where: { id: dbId },
        data: {
          previousId: node.prevId ? tempIdToDbId[node.prevId] : null,
          nextId: node.nextId ? tempIdToDbId[node.nextId] : null,
        },
      });
    }

    revalidatePath(`/dashboard/workouts`);

    return { success: "Workout updated!", workout: updatedWorkout };
  } catch (error) {
    console.error("Error updating workout:", error);
    return { error: "Something went wrong. Please try again." };
  }
}
