export function formatTime(seconds: number): string {
//   const sign = seconds < 0 ? "-" : "";
  const absSeconds = Math.abs(seconds);
  const mins = Math.floor(absSeconds / 60);
  const secs = absSeconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}
