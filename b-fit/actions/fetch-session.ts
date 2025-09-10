"use server";

import { auth } from "@/auth";
import { fetchSingleSessionDB } from "@/lib/db/session";

export async function fetchSession(sessionId: string) {
  try {
    const userSession = await auth();
    if (!userSession?.user || !userSession.user.id) {
      return { error: "Unauthorised" };
    }

    const session = await fetchSingleSessionDB(sessionId, userSession.user.id);
    if (!session) {
      throw new Error("Session not found");
    }

    return session;
  } catch (error: any) {
    console.error("Error fetching session:", error);
    throw new Error(error.message || "Failed to fetch session");
  }
}
