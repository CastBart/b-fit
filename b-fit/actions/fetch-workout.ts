"use server";

import { db } from "@/lib/db/db";
import { auth } from "@/auth";

import { Prisma } from "@prisma/client";

// Type for a Workout including its exercises and the related exercise model
export type WorkoutWithExercises = Prisma.WorkoutGetPayload<{
  include: {
    exercises: {
      include: { exercise: true };
    };
  };
}>;

export async function getWorkoutWithExercises(workoutId: string) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Unauthorized: User not logged in");
  }

  const workout = await db.workout.findUnique({
    where: { id: workoutId, userId: session.user.id },
    include: {
      exercises: {
        include: { exercise: true },
      },
    },
  });

  if (!workout) {
    throw new Error("Workout not found");
  }

  // 🔁 Reconstruct the ordered linked list of exercises
  const nodeMap = new Map<string, (typeof workout.exercises)[number]>();
  let head: (typeof workout.exercises)[number] | null = null;

  for (const ex of workout.exercises) {
    nodeMap.set(ex.id, ex);
  }

  // Find the head of the list (where previousId is null)
  for (const ex of workout.exercises) {
    if (!ex.previousId) {
      head = ex;
      break;
    }
  }

  // Traverse the list in order
  const orderedExercises: WorkoutWithExercises["exercises"] = [];
  let current = head;

  while (current) {
    orderedExercises.push(current);
    current = current.nextId ? (nodeMap.get(current.nextId) ?? null) : null;
  }

  return {
    ...workout,
    exercises: orderedExercises,
  };
}
