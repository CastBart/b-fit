// hooks/use-current-user.ts
"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const SESSION_SNAPSHOT_KEY = "lastUserSnapshot";

export function useCurrentUser() {
  const { data: session } = useSession();
  const [cachedUser, setCachedUser] = useState<any>(null);

  // Save latest session user into localStorage
  useEffect(() => {
    if (session?.user) {
      localStorage.setItem(
        SESSION_SNAPSHOT_KEY,
        JSON.stringify(session.user)
      );
      setCachedUser(session.user);
    } else {
      // Try restore from storage if session is missing
      const raw = localStorage.getItem(SESSION_SNAPSHOT_KEY);
      if (raw) {
        try {
          setCachedUser(JSON.parse(raw));
        } catch {
          localStorage.removeItem(SESSION_SNAPSHOT_KEY);
        }
      }
    }
  }, [session?.user]);

  return cachedUser;
}
