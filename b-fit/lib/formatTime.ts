export function formatTime(seconds: number): string {
  // const sign = seconds < 0 ? "-" : "";
  const absSeconds = Math.abs(seconds);
  
  const hours = Math.floor(absSeconds / 3600);
  const mins = Math.floor((absSeconds % 3600) / 60);
  const secs = absSeconds % 60;

  if (hours > 0) {
    return `${hours}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  } else {
    return `$${mins}:${secs.toString().padStart(2, '0')}`;
  }
}
