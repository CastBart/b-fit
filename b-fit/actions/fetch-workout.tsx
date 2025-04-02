"use server";

import { db } from "@/lib/db";
import { auth } from "@/auth";
import { Workout, Exercise } from "@/lib/definitions";
import {
  getEnumValueByKey,
  getEnumValuesByKeys,
} from "@/lib/definitions";
import {
  ExerciseEquipment,
  MuscleGroup,
  ExerciseType,
  ExerciseOwnership,
} from "@/lib/definitions";

export async function fetchWorkoutById(workoutId: string): Promise<Workout | null> {
  const session = await auth();
  if (!session?.user) return null;

  const workout = await db.workout.findUnique({
    where: { id: workoutId, userId: session.user.id }, // Ensure user owns the workout
    include: {
      exercises: {
        include: {
          exercise: true, // Fetch full exercise data
        },
      },
    },
  });

  if (!workout) return null;

  return {
    id: workout.id,
    name: workout.name,
    description: workout.description || "",
    userId: workout.userId,
    createdAt: workout.createdAt.toISOString(),
    exercises: workout.exercises.map((we) => ({
      id: we.exercise.id,
      owner: getEnumValueByKey(ExerciseOwnership, we.exercise.ownership),
      name: we.exercise.name,
      equipment: getEnumValueByKey(ExerciseEquipment, we.exercise.equipment),
      primaryMuscle: getEnumValueByKey(MuscleGroup, we.exercise.primaryMuscle),
      auxiliaryMuscles: getEnumValuesByKeys(MuscleGroup, we.exercise.auxiliaryMuscles),
      type: getEnumValueByKey(ExerciseType, we.exercise.exerciseType),
    })),
  };
}
