"use server";

import { db } from "@/lib/db/db";
import { auth } from "@/auth";
import { ExerciseProgress } from "@/store/sessionSlice";
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
      throw new Error("Unauthorized: User not logged in");
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

    // ✅ collect completed exercises
    const exerciseHistories = Object.values(progress)
      .filter((ex) => ex.sets.some((set) => set.completed))
      .map((ex) => {
        const sets = ex.sets
          .filter((set) => set.completed)
          .map((set) => ({
            reps: set.reps,
            weight: set.weight,
            setNumber: set.setNumber,
            isCompleted: true,
          }));

        return {
          exerciseId: exerciseMap[ex.exerciseId].id,
          sets,
        };
      });

    if (exerciseHistories.length === 0) {
      throw new Error("No completed sets to save.");
    }

    // ✅ create session & histories in one transaction
    const createdSession = await db.$transaction(
      async (tx) => {
        const session = await tx.session.create({
          data: {
            id: sessionId,
            userId: user.id!,
            workoutId,
            workoutName,
            startTime: new Date(startTime),
            duration,
            complete: true,
          },
        });

        await Promise.all(
          exerciseHistories.map((history) =>
            tx.exerciseHistory.create({
              data: {
                sessionId: session.id,
                exerciseId: history.exerciseId,
                userId: user.id!,
                sets: { create: history.sets },
              },
            })
          )
        );

        // 👇 fetch the session back with histories + sets
        return tx.session.findUniqueOrThrow({
          where: { id: session.id },
          include: {
            exerciseHistories: {
              include: { sets: true },
            },
          },
        });
      },
      { maxWait: 10000, timeout: 20000 }
    );

    return createdSession;
  } catch (error) {
    // console.error("[COMPLETE_SESSION_ERROR]", error);
    throw error; // let API route handle formatting into NextResponse
  }
}
