import { db } from "@/lib/db/db";
import { Exercise } from "@/lib/definitions";
import { CreateExerciseSchema } from "@/schemas";
import * as z from "zod";
import {
  ExerciseEquipment,
  MuscleGroup,
  ExerciseType,
  getEnumKeyByValue,
  getEnumKeysByValues,
} from "@/lib/definitions";

// Example: Create Exercise
export async function createExerciseDB(
  data: z.infer<typeof CreateExerciseSchema>,
  userId: string
) {
  // Validate fields
  const validatedFields = CreateExerciseSchema.safeParse(data);
  if (!validatedFields.success) {
    return { error: "Invalid exercise fields!" };
  }
  const {
    exerciseName,
    equipment,
    primaryMuscle,
    auxiliaryMuscles,
    exerciseType,
  } = validatedFields.data;

  // Convert frontend enum values to Prisma enums
  const equipmentEnumKey = getEnumKeyByValue(ExerciseEquipment, equipment);
  const primaryMuscleEnumKey = getEnumKeyByValue(MuscleGroup, primaryMuscle);
  const auxiliaryMusclesEnumKeys = getEnumKeysByValues(
    MuscleGroup,
    auxiliaryMuscles
  );
  const exerciseTypeEnumKey = getEnumKeyByValue(ExerciseType, exerciseType);

  // Ensure all required fields are correctly mapped
  if (!equipmentEnumKey || !primaryMuscleEnumKey || !exerciseTypeEnumKey) {
    return { error: "Invalid enum values provided." };
  }
  return db.exercise.create({
    data: {
      name: exerciseName,
      equipment: equipmentEnumKey,
      primaryMuscle: primaryMuscleEnumKey,
      auxiliaryMuscles: auxiliaryMusclesEnumKeys,
      exerciseType: exerciseTypeEnumKey,
      userId,
      ownership: "Custom",
    },
  });
}

// Example: Fetch Exercises
export async function fetchExercisesDB(userId: string) {
  return db.exercise.findMany({ where: { userId } });
}

// Add more CRUD functions as needed...
