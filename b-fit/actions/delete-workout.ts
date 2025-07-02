"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function deleteWorkout(id: string) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return { error: "Unauthorized" };
    }

    const workout = await db.workout.findUnique({
      where: { id },
      include: { exercises: true },
    });

    if (!workout || workout.userId !== session.user.id) {
      return { error: "Workout not found or permission denied" };
    }

    // First delete associated workoutExercises (if using cascading, this can be skipped)
    await db.workoutExercise.deleteMany({
      where: { workoutId: id },
    });

    await db.workout.delete({
      where: { id },
    });

    revalidatePath("/dashboard/workouts");

    return { success: "Workout deleted" };
  } catch (error) {
    console.error("Error deleting workout:", error);
    return { error: "Something went wrong while deleting the workout." };
  }
}
