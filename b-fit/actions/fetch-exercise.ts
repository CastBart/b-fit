// actions/fetch-exercise.ts
import { db } from "@/lib/db";
import { auth } from "@/auth";

import { ExerciseHistory } from "@prisma/client";

export interface History {
  sessionId: string;
  id: string;
  exerciseId: string;
  userId: string;
  notes: string | null;
}

export async function fetchExercise(
  exerciseId: string
): Promise<History | { error: string }> {
  const session = await auth();
  if (!session?.user) {
    return { error: "Unauthorised" };
  }
  const userId = session.user.id;
  const exercise = await db.exercise.findUnique({
    where: {
      id: exerciseId,
      userId: userId,
    },
    include: {
      workouts: true,
    },
  });

  const history = await db.exerciseHistory.findMany({
    where: {
      exerciseId,
      userId: userId,
    },
    include: {
      sets: true,
      session: {
        select: {
          startTime: true,
          duration: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  
  return { history };
}
