"use server"
import { db } from "@/lib/db";
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
    where: { userId: session.user.id },
  });

  return exercises.map((exercise) => ({
    id: exercise.id,
    owner: ExerciseOwnership.Custom,
    name: exercise.name,
    equipment: getEnumValueByKey(ExerciseEquipment, exercise.equipment), // ✅ Now returns an enum value
    primaryMuscle: getEnumValueByKey(MuscleGroup, exercise.primaryMuscle), // ✅ Now returns an enum value
    auxiliaryMuscles: getEnumValuesByKeys(MuscleGroup, exercise.auxiliaryMuscles), // ✅ Returns an array of enum values
    type: getEnumValueByKey(ExerciseType, exercise.exerciseType), // ✅ Now returns an enum value
  }));
}
