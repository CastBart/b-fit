"use client";

import { ReactNode, useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "@/store";
import { rehydrateSession, SessionState } from "@/store/sessionSlice";

const SESSION_STORAGE_KEY = "session";
const EXPIRY_MS = 24 * 60 * 60 * 1000; // 24h

export function saveSessionToStorage(session: SessionState) {
  try {
    const payload = {
      ...session,
      updatedAt: Date.now(),
      expiresAt: Date.now() + EXPIRY_MS,
    };
    localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(payload));
  } catch (err) {
    console.error("Failed to save session:", err);
  }
}

export function loadSessionFromStorage(): SessionState | null {
  try {
    const raw = localStorage.getItem(SESSION_STORAGE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw);

    // check expiration
    if (parsed.expiresAt && parsed.expiresAt < Date.now()) {
      localStorage.removeItem(SESSION_STORAGE_KEY);
      return null;
    }

    return parsed as SessionState;
  } catch (err) {
    console.error("Failed to load session:", err);
    return null;
  }
}

export function clearSessionStorage() {
  localStorage.removeItem(SESSION_STORAGE_KEY);
}

export function StoreProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    // 1. Load saved session if exists
    const saved = loadSessionFromStorage();
    if (saved?.isActive) {
      store.dispatch(rehydrateSession(saved));
    }

    // 2. Subscribe to changes
    const unsubscribe = store.subscribe(() => {
      const state = store.getState();

      if (state.session.isActive) {
        saveSessionToStorage(state.session);
      } else {
        localStorage.removeItem(SESSION_STORAGE_KEY);
      }
    });

    return unsubscribe;
  }, []);

  return <Provider store={store}>{children}</Provider>;
}
