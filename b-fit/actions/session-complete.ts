"use server";

import { db } from "@/lib/db";
import { auth } from "@/auth";
import { ExerciseProgress, SessionState } from "@/store/sessionSlice";
import { revalidatePath } from "next/cache";
import { FlattenedExerciseNode } from "@/lib/exercise-linked-list";

export interface SessionInput {
  sessionId: string;
  workoutId: string;
  workoutName: string;
  startTime: number;
  duration: number;
  exerciseMap: Record<string, FlattenedExerciseNode>;
  progress: Record<string, ExerciseProgress>;
}

export async function completeSession(sessionData: SessionInput) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return { error: "Unauthorized: User not logged in" };
    }
    const user = session.user;
    const {
      sessionId,
      workoutId,
      workoutName,
      startTime,
      exerciseMap,
      progress,
      duration,
    } = sessionData;

    // Prepare data for ExerciseHistory creation
    const exerciseHistories = Object.values(progress)
      .filter((ex) => ex.sets.some((set) => set.completed))
      .map((ex) => {
        const sets = ex.sets
          .filter((set) => set.completed)
          .map((set) => ({
            reps: set.reps,
            weight: set.weight,
          }));

        return {
          exerciseId: exerciseMap[ex.exerciseId].id,
          userId: user.id,
          sets,
        };
      });
    if (exerciseHistories.length === 0) {
      return { error: "No completed sets to save." };
    }
    await db.$transaction(
      async (tx) => {
        const session = await tx.session.create({
          data: {
            id: sessionId,
            userId: user.id!,
            workoutId,
            workoutName,
            startTime: new Date(startTime!),
            duration,
            complete: true,
          },
        });

        for (const history of exerciseHistories) {
          await tx.exerciseHistory.create({
            data: {
              sessionId: session.id,
              exerciseId: history.exerciseId,
              userId: user.id!,
              sets: {
                create: history.sets.map((s) => ({
                  reps: s.reps,
                  weight: s.weight,
                  isCompleted: true,
                })),
              },
            },
          });
        }
      },
      { maxWait: 10000, timeout: 20000 }
    );
    revalidatePath("/dashboard");

    return { success: true };
  } catch (error) {
    console.error("[COMPLETE_SESSION_ERROR]", error);
    return { error: "Internal server error" };
  }
}
