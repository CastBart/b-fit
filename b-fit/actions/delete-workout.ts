"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db/db";

export async function deleteWorkout(id: string): Promise<string> {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const workout = await db.workout.findUnique({
    where: { id },
    include: { exercises: true },
  });

  if (!workout || workout.userId !== session.user.id) {
    throw new Error("Workout not found or permission denied");
  }

  // First delete associated workoutExercises (if using cascading, this can be skipped)
  await db.workoutExercise.deleteMany({
    where: { workoutId: id },
  });

  await db.workout.delete({
    where: { id },
  });

  return id;
}
