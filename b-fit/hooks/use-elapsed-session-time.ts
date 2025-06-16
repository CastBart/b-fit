import { useSelector } from "react-redux";
import { RootState } from "@/store";

export function useElapsedSessionTime() {
  const startTime = useSelector((state: RootState) => state.session.startTime);
  const tick = useSelector((state: RootState) => state.timer.tick);

  if (!startTime) return null;

  const now = Date.now();
  const elapsedMs = now - startTime;
  const elapsedSec = Math.floor(elapsedMs / 1000);

  return elapsedSec;
}
