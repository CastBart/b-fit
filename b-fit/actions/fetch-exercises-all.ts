"use server";
import { auth } from "@/auth";
import {
  Exercise,
} from "@/lib/definitions";
import { fetchUserExercisesDB } from "@/lib/db/exercise";

export async function fetchUserExercises(): Promise<Exercise[]> {
 
  try {
    const session = await auth();
    if (!session?.user || !session.user.id) {
      throw new Error("Unauthorized");
    }
    const result = await fetchUserExercisesDB(session.user.id);
    return result;
  } catch (error) {
    // console.error("Error fetching exercise history:", error);
    throw new Error("Failed to fetch exercise history.");
  }
}
