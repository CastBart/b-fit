import { useSelector } from "react-redux";
import { RootState } from "@/store";

export function useElapsedSessionTime() {
  const { startTime, isPaused, pauseTime, accumulatedPauseDuration } =
    useSelector((state: RootState) => state.session);
  const tick = useSelector((state: RootState) => state.timer.tick);

  if (!startTime) return null;

  // Convert to timestamps (ms since epoch)
  const start = new Date(startTime).getTime();
  const now = Date.now();
  const pause = pauseTime ? new Date(pauseTime).getTime() : null;

  const totalPaused =
    accumulatedPauseDuration +
    (isPaused && pause ? now - pause : 0);

  return Math.floor((now - start - totalPaused) / 1000); // seconds
}
