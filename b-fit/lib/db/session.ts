import { db } from "@/lib/db/db";
import { Prisma } from "@prisma/client";

export type SessionWithHistory = Prisma.SessionGetPayload<{
  include: {
    exerciseHistories: {
      include: { sets: true };
    };
  };
}>;

/**
 * Fetches a session along with its exercise histories and sets for a specific user.
 * @param sessionId ID of the session to fetch
 * @param userId ID of the user requesting the session
 * @returns Session details including exercise histories and sets or null if not found
 */
export async function fetchSingleSessionDB(
  sessionId: string,
  userId: string
): Promise<SessionWithHistory | null> {
  return db.session.findUnique({
    where: { id: sessionId, userId },
    include: {
      exerciseHistories: {
        include: {
          sets: true,
        },
      },
    },
  });
}
