import { store } from "@/store";
import { incrementTick } from "@/store/timerSlice";

let interval: NodeJS.Timeout | null = null;

export function startGlobalTimer() {
  if (interval) return; 
  interval = setInterval(() => {
    store.dispatch(incrementTick());
  }, 1000);
}

export function stopGlobalTimer() {
  if (interval) {
    clearInterval(interval);
    interval = null;
  }
}
