"use server";

import { db } from "@/lib/db/db";
import { auth } from "@/auth";

export async function deleteExercise(exerciseId: string) {
  const session = await auth();
  if (!session?.user) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    await db.exercise.delete({
      where: { id: exerciseId, userId: session.user.id },
    });

    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to delete exercise" };
  }
}
