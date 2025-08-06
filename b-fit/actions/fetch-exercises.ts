"use server";
import { db } from "@/lib/db/db";
import { auth } from "@/auth";
import {
  Exercise,
  ExerciseEquipment,
  MuscleGroup,
  ExerciseType,
  ExerciseOwnership,
  getEnumValueByKey,
  getEnumValuesByKeys,
} from "@/lib/definitions";

export async function fetchUserExercises(): Promise<Exercise[]> {
  const session = await auth();
  if (!session?.user) {
    return [];
  }

  const exercises = await db.exercise.findMany({
    where: {
      OR: [{ userId: session.user.id }, { ownership: "BFit" }],
    },
  });

  return exercises.map((exercise) => ({
    id: exercise.id,
    owner: getEnumValueByKey(ExerciseOwnership, exercise.ownership),
    name: exercise.name,
    equipment: getEnumValueByKey(ExerciseEquipment, exercise.equipment),
    primaryMuscle: getEnumValueByKey(MuscleGroup, exercise.primaryMuscle),
    auxiliaryMuscles: getEnumValuesByKeys(
      MuscleGroup,
      exercise.auxiliaryMuscles
    ),
    type: getEnumValueByKey(ExerciseType, exercise.exerciseType),
  }));
}
