export const formatSecondsToMinute = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  const fMinutes = String(minutes).padStart(2, "0");
  const fSeconds = String(remainingSeconds).padStart(2, "0");

  return `${fMinutes}:${fSeconds}`;
};
