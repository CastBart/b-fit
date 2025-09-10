"use server";
import { auth } from "@/auth";
import { fetchAllSessionsDB, SessionWithHistory } from "@/lib/db/session";

export async function fetchUserAllSessions(): Promise<SessionWithHistory[]> {
 
  try {
    const session = await auth();
    if (!session?.user || !session.user.id) {
      throw new Error("Unauthorized");
    }
    const result = await fetchAllSessionsDB(session.user.id);
    return result;
  } catch (error) {
    throw new Error("FETCH_USER_SESSIONS: Failed to fetch  user sessions");
  }
}
