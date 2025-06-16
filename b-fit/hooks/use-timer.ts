import { useSelector } from "react-redux";
import { RootState } from "@/store";

export function useTimeLeft() {
  const endTime = useSelector((state: RootState) => state.session.timer?.endTime);
  const isRunning = useSelector((state: RootState) => state.session.timer?.isRunning);
  const tick = useSelector((state: RootState) => state.timer.tick);

  if (!isRunning || !endTime) return null;

  const now = Date.now();
  const timeLeftMs = endTime - now;
  const timeLeftSec = Math.floor(timeLeftMs / 1000); 

  return timeLeftSec;
}
