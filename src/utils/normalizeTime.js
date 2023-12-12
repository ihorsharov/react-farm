export function normalizeTime(time) {
  const SECONDS_IN_HOUR = 3600;
  const SECONDS_IN_MINUTE = 60;

  const remainingSeconds = time % SECONDS_IN_HOUR;
  const timeInHours = Math.floor(time / SECONDS_IN_HOUR);
  const timeInMinutes = Math.floor(remainingSeconds / SECONDS_IN_MINUTE);
  const timeInSeconds = remainingSeconds % SECONDS_IN_MINUTE;

  const hours = String(timeInHours).padStart(2, '0');
  const minutes = String(timeInMinutes).padStart(2, '0');
  const seconds = String(timeInSeconds).padStart(2, '0');

  if (timeInHours) return `${hours}:${minutes}:${seconds}`;
  if (timeInMinutes) return `${minutes}:${seconds}`;
  if(timeInSeconds < 10) return `${timeInSeconds}`
  return `${seconds}`;
}