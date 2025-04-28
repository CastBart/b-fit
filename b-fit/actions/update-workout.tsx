"use server";

import * as z from "zod";
import { db } from "@/lib/db";
import { auth } from "@/auth";
import { WorkoutSchema } from "@/schemas";

export async function updateWorkout(id: string, values: z.infer<typeof WorkoutSchema>) {
  try {
    const validated = WorkoutSchema.safeParse(values);
    if (!validated.success) {
      return { error: "Invalid workout data" };
    }

    const session = await auth();
    if (!session?.user?.id) {
      return { error: "Unauthorized" };
    }

    const exercises = validated.data.exercises;

    await db.$transaction(async (tx) => {
      await tx.workout.update({
        where: { id, userId: session.user.id },
        data: {
          name: validated.data.name,
          description: validated.data.description || null,
        },
      });

      const currentWorkoutExercises = await tx.workoutExercise.findMany({
        where: { workoutId: id },
      });

      const existingWorkoutExerciseIds = new Set(currentWorkoutExercises.map((e) => e.id));

      const workoutExerciseMap: Record<string, string> = {};

      // Step 1: Upsert (update existing, create new)
      for (const node of exercises) {
        if (existingWorkoutExerciseIds.has(node.instanceId)) {
          // Update existing
          await tx.workoutExercise.update({
            where: { id: node.instanceId },
            data: {
              exerciseId: node.exerciseID,
              previousId: null,
              nextId: null,
            },
          });
          workoutExerciseMap[node.instanceId] = node.instanceId;
        } else {
          // Create new
          const created = await tx.workoutExercise.create({
            data: {
              workoutId: id,
              exerciseId: node.exerciseID,
              supersetGroupId: node.supersetGroupId || null,
            },
          });
          workoutExerciseMap[node.instanceId] = created.id;
        }
      }

      // Step 2: Delete removed exercises
      const incomingInstanceIds = new Set(exercises.map((e) => e.instanceId));
      const toDelete = currentWorkoutExercises.filter(
        (e) => !incomingInstanceIds.has(e.id)
      );

      if (toDelete.length > 0) {
        await tx.workoutExercise.deleteMany({
          where: { id: { in: toDelete.map((e) => e.id) } },
        });
      }

      // Step 3: Reconnect previousId and nextId
      await Promise.all(
        exercises.map((node) =>
          tx.workoutExercise.update({
            where: { id: workoutExerciseMap[node.instanceId] },
            data: {
              previousId: node.prevId ? workoutExerciseMap[node.prevId] : null,
              nextId: node.nextId ? workoutExerciseMap[node.nextId] : null,
              supersetGroupId: node.supersetGroupId || null,
            },
          })
        )
      );
    });

    return { success: "Workout updated!" };
  } catch (error) {
    console.error(error);
    return { error: "Something went wrong." };
  }
}
