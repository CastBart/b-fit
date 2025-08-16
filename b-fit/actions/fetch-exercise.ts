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
): Promise<ExerciseWithHistory | { error: string }> {
  try {
    const session = await auth();
    if (!session?.user || !session.user.id) {
      return { error: "Unauthorised" };
    }
    const result = await fetchExerciseDB(exerciseId, session.user.id);
    return result ;
  } catch (error) {
    console.error("Error fetching exercise history:", error);
    return { error: "Failed to fetch exercise history." };
  }
}
