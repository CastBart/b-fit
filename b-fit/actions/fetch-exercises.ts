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
import { fetchUserExercisesDB } from "@/lib/db/exercise";

export async function fetchUserExercises(): Promise<
  Exercise[] | { error: string }
> {
  // const session = await auth();
  // if (!session?.user) {
  //   return [];
  // }

  // const exercises = await db.exercise.findMany({
  //   where: {
  //     OR: [{ userId: session.user.id }, { ownership: "BFit" }],
  //   },
  // });

  // return exercises.map((exercise) => ({
  //   id: exercise.id,
  //   owner: getEnumValueByKey(ExerciseOwnership, exercise.ownership),
  //   name: exercise.name,
  //   equipment: getEnumValueByKey(ExerciseEquipment, exercise.equipment),
  //   primaryMuscle: getEnumValueByKey(MuscleGroup, exercise.primaryMuscle),
  //   auxiliaryMuscles: getEnumValuesByKeys(
  //     MuscleGroup,
  //     exercise.auxiliaryMuscles
  //   ),
  //   type: getEnumValueByKey(ExerciseType, exercise.exerciseType),
  // }));
  try {
    const session = await auth();
    if (!session?.user || !session.user.id) {
      return { error: "Unauthorised" };
    }
    const result = await fetchUserExercisesDB(session.user.id);
    return result;
  } catch (error) {
    console.error("Error fetching exercise history:", error);
    return { error: "Failed to fetch exercise history." };
  }
}
