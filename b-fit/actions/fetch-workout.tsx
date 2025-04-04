"use server";

import { db } from "@/lib/db";
import { auth } from "@/auth";

export async function getWorkoutWithExercises(workoutId: string) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return { error: "Unauthorized: User not logged in" };
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
      return { error: "Workout not found" };
    }

    // 🔁 Reconstruct the ordered linked list of exercises
    const nodeMap = new Map<string, typeof workout.exercises[number]>();
    let head: typeof workout.exercises[number] | null = null;

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
    const orderedExercises = [];
    let current = head;

    while (current) {
      orderedExercises.push(current);
      current = current.nextId ? nodeMap.get(current.nextId) ?? null : null;
    }

    return {
      success: true,
      workout: {
        ...workout,
        exercises: orderedExercises,
      },
    };
  } catch (error) {
    console.error("Error fetching workout:", error);
    return { error: "Something went wrong. Please try again." };
  }
}
