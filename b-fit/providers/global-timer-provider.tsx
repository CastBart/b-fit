"use client";

import { useEffect } from "react";
import { startGlobalTimer, stopGlobalTimer } from "@/lib/timeRunner";

export function GlobalTimerProvider() {
  useEffect(() => {
    startGlobalTimer();
    return () => stopGlobalTimer(); // cleanup on unmount (optional)
  }, []);

  return null; // no UI, just side effect
}
