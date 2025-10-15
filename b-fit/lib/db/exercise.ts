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
import { ExerciseWithHistory } from "@/actions/fetch-exercise";

/**
 * Creates a new exercise in the database after validating the input data.
 * @param data Data for the new exercise passed from the frontend
 * @param userId ID of the user creating the exercise
 * @returns Database record of the created exercise or an error object
 */
export async function createExerciseDB(
  data: z.infer<typeof CreateExerciseSchema>,
  userId: string
): Promise<Exercise> {
  // Validate fields
  const validatedFields = CreateExerciseSchema.safeParse(data);
  if (!validatedFields.success) {
    throw new Error("Invalid exercise fields!");
  }
  const {
    id,
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
    throw new Error("Invalid enum values provided.");
  }
  const exercise = await db.exercise.upsert({
    where: { id: id ?? "" },
    update: {},
    create: {
      id,
      name: exerciseName,
      equipment: equipmentEnumKey,
      primaryMuscle: primaryMuscleEnumKey,
      auxiliaryMuscles: auxiliaryMusclesEnumKeys,
      exerciseType: exerciseTypeEnumKey,
      userId,
      ownership: "Custom",
    },
  });

  return {
    id: exercise.id,
    owner: getEnumValueByKey(ExerciseOwnership, exercise.ownership),
    name: exercise.name,
    equipment: getEnumValueByKey(ExerciseEquipment, exercise.equipment),
    primaryMuscle: getEnumValueByKey(MuscleGroup, exercise.primaryMuscle),
    auxiliaryMuscles: getEnumValuesByKeys(MuscleGroup, exercise.auxiliaryMuscles),
    type: getEnumValueByKey(ExerciseType, exercise.exerciseType),
    notes: exercise.notes || undefined,
    instructions: exercise.instructions || "",
  }
}

/**
 * Fetches an exercise along with its history for a specific user.
 * @param exerciseId  ID of the exercise to fetch history for
 * @param userId  ID of the user requesting the exercise history
 * @returns  Exercise details along with its history or an error object
 */
export async function fetchExerciseDB(
  exerciseId: string,
  userId: string
): Promise<ExerciseWithHistory> {
  const exerciseRecord = await db.exercise.findUnique({
    where: { id: exerciseId },
  });
  if (!exerciseRecord) {
    throw new Error("Exercise not found.");
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
    instructions: exerciseRecord.instructions || "",
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
      createdAt: "desc",
    },
  });

  const history = histories.map((history) => ({
    exerciseName: history.exercise.name,
    workoutName: history.session.workoutName,
    sessionStartTime: new Date(history.session.startTime).getTime(),
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
/**
 * Fetches all exercises owned by a specific user and public exercises.
 * @param userId ID of the user whose exercises are to be fetched
 * @returns List of exercises owned by the user or public exercises
 */
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
    instructions: exercise.instructions || "",
  }));
}

// Add more CRUD functions as needed...
