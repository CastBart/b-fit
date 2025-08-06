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
  
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return { error: "You must be logged in to create an exercise." };
    }
    const result = await createExerciseDB(values, session.user.id); // Use the user ID from the session

    if ("error" in result) {
      return result; 
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
