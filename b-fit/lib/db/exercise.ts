import { db } from "@/lib/db/db";
import { CreateExerciseSchema } from "@/schemas";
import * as z from "zod";
import {
  ExerciseEquipment,
  MuscleGroup,
  ExerciseType,
  getEnumKeyByValue,
  getEnumKeysByValues,
  Exercise,
  ExerciseOwnership,
  getEnumValueByKey,
  getEnumValuesByKeys,
} from "@/lib/definitions";
import { ExerciseHistory, ExerciseWithHistory } from "@/actions/fetch-exercise";

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

// Fetch Exercise History
export async function fetchExerciseDB(
  exerciseId: string,
  userId: string
): Promise<ExerciseWithHistory | { error: string }> {
  const exerciseRecord = await db.exercise.findUnique({
    where: { id: exerciseId },
  });
  if (!exerciseRecord) {
    return { error: "Exercise not found." };
  }
  const exercise: Exercise = {
    id: exerciseRecord.id,
    owner: getEnumValueByKey(ExerciseOwnership, exerciseRecord.ownership),
    name: exerciseRecord.name,
    equipment: getEnumValueByKey(ExerciseEquipment, exerciseRecord.equipment),
    primaryMuscle: getEnumValueByKey(MuscleGroup, exerciseRecord.primaryMuscle),
    auxiliaryMuscles: getEnumValuesByKeys(
      MuscleGroup,
      exerciseRecord.auxiliaryMuscles
    ),
    type: getEnumValueByKey(ExerciseType, exerciseRecord.exerciseType),
  };

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

  const history = histories.map((history) => ({
    exerciseName: history.exercise.name,
    workoutName: history.session.workoutName,
    sessionStartTime: history.session.startTime,
    sets: history.sets.map((set) => ({
      reps: set.reps,
      weight: set.weight,
      setNumber: set.setNumber,
    })),
  }));

  return {
    exercise,
    history,
  };
}

//fetch all exercises
export async function fetchUserExercisesDB(
  userId: string
): Promise<Exercise[]> {
  const exercises = await db.exercise.findMany({
    where: {
      OR: [{ userId: userId }, { ownership: "BFit" }],
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

// Add more CRUD functions as needed...
