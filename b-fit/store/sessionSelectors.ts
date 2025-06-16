import { RootState } from "@/store";  // adjust your store path

export const selectTimeLeft = (state: RootState): number => {
  if (!state.session.timer?.isRunning || state.session.timer.endTime === null) {
    return 0;
  }
  const remaining = Math.max(0, state.session.timer.endTime - Date.now());
  return Math.floor(remaining / 1000); // return seconds
};
