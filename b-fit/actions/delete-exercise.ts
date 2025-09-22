"use server";

import { db } from "@/lib/db/db";
import { auth } from "@/auth";
import { ExerciseOwnership } from "@/lib/definitions";

/**
 * Deletes a user-owned exercise.
 * @returns the deleted exercise id
 */
export async function deleteExercise(id: string): Promise<string> {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const exercise = await db.exercise.findUnique({
    where: { id },
    select: { id: true, userId: true, ownership: true },
  });

  if (
    !exercise ||
    exercise.userId !== session.user.id ||
    exercise.ownership === ExerciseOwnership.BFit
  ) {
    throw new Error("Not found or forbidden");
  }

  await db.exercise.delete({ where: { id } });

  return id;
}
