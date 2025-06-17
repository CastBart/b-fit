"use server";

import { prisma } from "@/lib/db";
import { auth } from "@/auth";
import { SessionState } from "@/store/sessionSlice";
import { revalidatePath } from "next/cache";

export async function completeSession(sessionData: SessionState) {
  const user = await auth();
  if (!user) throw new Error("Unauthorized");

  const {
    workoutId,
    workoutName,
    startTime,
    exerciseMap,
  } = sessionData;

  // Create session record
  const session = await prisma.session.create({
    where: { id: sessionId },
    create: {
      id: sessionId,
      userId: user.id,
      workoutId,
      workoutName,
      startTime: new Date(startTime),
      endTime: new Date(endTime),
      duration,
      complete: true,
    },
    update: {
      endTime: new Date(endTime),
      duration,
      complete: true,
    },
  });

  // Create ExerciseHistory entries for completed sets
  const historyEntries = Object.values(exerciseMap)
    .filter((ex) => ex.sets.some((set) => set.completed))
    .map((ex) => ({
      sessionId: session.id,
      exerciseId: ex.exerciseId, // original exercise ID
      userId: user.id,
      name: ex.name,
      sets: JSON.stringify(ex.sets.filter((s) => s.completed)),
    }));

  if (historyEntries.length > 0) {
    await prisma.exerciseHistory.createMany({
      data: historyEntries,
    });
  }

  revalidatePath("/dashboard/sessions"); // or wherever needed

  return { success: true };
}
