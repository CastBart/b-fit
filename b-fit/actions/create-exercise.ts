"use server";

import * as z from "zod";
import { CreateExerciseSchema } from "@/schemas";
import { db } from "@/lib/db/db";
import { auth } from "@/auth"; // Authentication setup
import {
  ExerciseEquipment,
  MuscleGroup,
  ExerciseType,
  getEnumKeyByValue,
  getEnumKeysByValues,
} from "@/lib/definitions"; // ✅ Import frontend enums
import { createExerciseDB } from "@/lib/db/exercise";

export async function createExercise(
  values: z.infer<typeof CreateExerciseSchema>
) {
  // // Validate fields
  // const validatedFields = CreateExerciseSchema.safeParse(values);
  // if (!validatedFields.success) {
  //   return { error: "Invalid exercise fields!" };
  // }

  // const {
  //   exerciseName,
  //   equipment,
  //   primaryMuscle,
  //   auxiliaryMuscles,
  //   exerciseType,
  // } = validatedFields.data;

  // Ensure the user is authenticated

  // // Convert frontend enum values to Prisma enums
  // const equipmentEnumKey = getEnumKeyByValue(ExerciseEquipment, equipment);
  // const primaryMuscleEnumKey = getEnumKeyByValue(MuscleGroup, primaryMuscle);
  // const auxiliaryMusclesEnumKeys = getEnumKeysByValues(
  //   MuscleGroup,
  //   auxiliaryMuscles
  // );
  // const exerciseTypeEnumKey = getEnumKeyByValue(ExerciseType, exerciseType);

  // // Ensure all required fields are correctly mapped
  // if (!equipmentEnumKey || !primaryMuscleEnumKey || !exerciseTypeEnumKey) {
  //   return { error: "Invalid enum values provided." };
  // }

  // try {
  //   // Create exercise in the database
  //   await db.exercise.create({
  //     data: {
  //       name: exerciseName,
  //       equipment: equipmentEnumKey,
  //       primaryMuscle: primaryMuscleEnumKey,
  //       auxiliaryMuscles: auxiliaryMusclesEnumKeys,
  //       exerciseType: exerciseTypeEnumKey,
  //       userId: session.user.id, // Linking exercise to the logged-in user
  //       ownership: "Custom"
  //     },
  //   });

  //   return {
  //     exercise: {
  //       exerciseName,
  //       equipment,
  //       primaryMuscle,
  //       auxiliaryMuscles,
  //       exerciseType,
  //     },
  //   };

  try {
    const session = await auth();
    if (!session?.user?.id) {
      return { error: "You must be logged in to create an exercise." };
    }
    const result = await createExerciseDB(values, session.user.id); // Use the user ID from the session

    if ("error" in result) {
      return result; // { error: ... }
    }
    return {
      exercise: {
        exerciseName: result.name,
        equipment: result.equipment,
        primaryMuscle: result.primaryMuscle,
        auxiliaryMuscles: result.auxiliaryMuscles,
        exerciseType: result.exerciseType,
      },
    };
  } catch (error) {
    console.error("Error creating exercise:", error);
    return { error: "Failed to create exercise." };
  }
}
