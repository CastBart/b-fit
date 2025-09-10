// actions/fetch-exercise.ts
import { auth } from "@/auth";
import { fetchExerciseDB } from "@/lib/db/exercise";
import { Exercise } from "@/lib/definitions";

export interface ExerciseWithHistory {
  exercise: Exercise;
  history: ExerciseHistory[];
}

export interface ExerciseHistory {
  exerciseName: string;
  workoutName: string;
  sessionStartTime: number;
  sets: ExerciseSet[];
}

export interface ExerciseSet {
  reps: number;
  weight: number | null;
  setNumber?: number;
}

export async function fetchExercise(
  exerciseId: string
): Promise<ExerciseWithHistory> {
  try {
    const session = await auth();
    if (!session?.user || !session.user.id) {
      throw new Error("Unauthorized");
    }
    const result = await fetchExerciseDB(exerciseId, session.user.id);
    return result ;
  } catch (error) {
    // console.error("[FETCH_EXERCISE_DB] - Error fetching exercise history:", error);
    throw new Error("Failed to fetch exercise history.");
  }
}
