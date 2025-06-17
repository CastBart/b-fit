import { useSelector } from "react-redux";
import { RootState } from "@/store";

export function useElapsedSessionTime() {
  const { startTime, isPaused, pauseTime, accumulatedPauseDuration } =
    useSelector((state: RootState) => state.session);
  const tick = useSelector((state: RootState) => state.timer.tick);

  if (!startTime) return null;

  const now = Date.now();
  const totalPaused =
    accumulatedPauseDuration + (isPaused && pauseTime ? now - pauseTime : 0);

  return Math.floor((now - startTime - totalPaused) / 1000);
}
