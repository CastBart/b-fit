// actions/fetch-exercise.ts
import { db } from "@/lib/db";
import { auth } from "@/auth";

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
  const session = await auth();
  if (!session?.user) {
    return { error: "Unauthorised" };
  }
  const userId = session.user.id;
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
