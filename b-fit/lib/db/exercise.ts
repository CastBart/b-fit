import { db } from "@/lib/db/db";
import { CreateExerciseSchema } from "@/schemas";
import * as z from "zod";
import {
  ExerciseEquipment,
  MuscleGroup,
  ExerciseType,
  getEnumKeyByValue,
  getEnumKeysByValues,
} from "@/lib/definitions";
import { ExerciseHistory } from "@/actions/fetch-exercise";

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
export async function fetchExerciseHistoryDB(exerciseId: string, userId: string ): Promise<ExerciseHistory[] | { error: string }> {
  const histories = await db.exerciseHistory.findMany({
    where: {
      exerciseId,
      userId,
    },
    include: {
      sets: true,
      session: {
        select: {
          startTime: true,
          workoutName: true,
        },
      },
      exercise: {
        select: {
          name: true,
        },
      },
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  return histories.map((history) => ({
    exerciseName: history.exercise.name,
    workoutName: history.session.workoutName,
    sessionStartTime: history.session.startTime,
    sets: history.sets.map((set) => ({
      reps: set.reps,
      weight: set.weight,
      setNumber: set.setNumber,
    })),
  }));
}

// Add more CRUD functions as needed...
