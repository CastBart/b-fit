"use server";

import * as z from "zod";
import { CreateExerciseSchema } from "@/schemas";
import { db } from "@/lib/db";
import { auth } from "@/auth"; // Authentication setup
import { Prisma } from "@prisma/client"; // ✅ Import Prisma enums
import { ExerciseEquipment, MuscleGroup, ExerciseType, getEnumKeyByValue, getEnumKeysByValues } from "@/lib/definitions"; // ✅ Import frontend enums

export async function createExercise(values: z.infer<typeof CreateExerciseSchema>) {
  // Validate fields
  const validatedFields = CreateExerciseSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid exercise fields!" };
  }

  const { exerciseName, equipment, primaryMuscle, auxiliaryMuscles, exerciseType } = validatedFields.data;

  // Ensure the user is authenticated
  const session = await auth();
  if (!session?.user?.id) {
    return { error: "You must be logged in to create an exercise." };
  }

  // Convert frontend enum values to Prisma enums
  const equipmentEnumKey = getEnumKeyByValue(ExerciseEquipment, equipment);
  const primaryMuscleEnumKey = getEnumKeyByValue(MuscleGroup, primaryMuscle);
  const auxiliaryMusclesEnumKeys = getEnumKeysByValues(MuscleGroup, auxiliaryMuscles);
  const exerciseTypeEnumKey = getEnumKeyByValue(ExerciseType, exerciseType);

  // Ensure all required fields are correctly mapped
  if (!equipmentEnumKey || !primaryMuscleEnumKey || !exerciseTypeEnumKey) {
    return { error: "Invalid enum values provided." };
  }

  try {
    // Create exercise in the database
    await db.exercise.create({
      data: {
        name: exerciseName,
        equipment: equipmentEnumKey, 
        primaryMuscle: primaryMuscleEnumKey,
        auxiliaryMuscles: auxiliaryMusclesEnumKeys,
        exerciseType: exerciseTypeEnumKey,
        userId: session.user.id, // Linking exercise to the logged-in user
      },
    });

    return { success: "Exercise created successfully!" };
  } catch (error) {
    console.error("Error creating exercise:", error);
    return { error: "Failed to create exercise." };
  }
}
