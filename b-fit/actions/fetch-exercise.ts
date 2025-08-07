// actions/fetch-exercise.ts
import { db } from "@/lib/db/db";
import { auth } from "@/auth";
import { fetchExerciseHistoryDB } from "@/lib/db/exercise";

export interface ExerciseHistory {
  exerciseName: string;
  workoutName: string;
  sessionStartTime: Date;
  sets: ExerciseSet[];
}

export interface ExerciseSet {
  reps: number;
  weight: number | null;
  setNumber?: number;
}

export async function fetchExercise(
  exerciseId: string
): Promise<ExerciseHistory[] | { error: string }> {
  // const session = await auth();
  // if (!session?.user) {
  //   return { error: "Unauthorised" };
  // }
  // const userId = session.user.id;
  // const histories = await db.exerciseHistory.findMany({
  //   where: {
  //     exerciseId,
  //     userId,
  //   },
  //   include: {
  //     sets: true,
  //     session: {
  //       select: {
  //         startTime: true,
  //         workoutName: true,
  //       },
  //     },
  //     exercise: {
  //       select: {
  //         name: true,
  //       },
  //     },
  //   },
  //   orderBy: {
  //     createdAt: "asc",
  //   },
  // });

  // return histories.map((history) => ({
  //   exerciseName: history.exercise.name,
  //   workoutName: history.session.workoutName,
  //   sessionStartTime: history.session.startTime,
  //   sets: history.sets.map((set) => ({
  //     reps: set.reps,
  //     weight: set.weight,
  //     setNumber: set.setNumber,
  //   })),
  // }));
  try {
    const session = await auth();
    if (!session?.user || !session.user.id) {
      return { error: "Unauthorised" };
    }
    const result = await fetchExerciseHistoryDB(exerciseId, session.user.id);
    return result;
  } catch (error) {
    console.error("Error fetching exercise history:", error);
    return { error: "Failed to fetch exercise history." };
  }
}
