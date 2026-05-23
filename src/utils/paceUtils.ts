const RIEGEL_EXPONENT = 1.06;

export function predict(baseTime: number, baseDistance: number, targetDistance: number): number {
  return baseTime * Math.pow(targetDistance / baseDistance, RIEGEL_EXPONENT);
}

export function formatPace(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds <= 0) {
    return '—';
  }
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.round(seconds % 60);
  if (remainingSeconds === 60) {
    return `${minutes + 1}:00`;
  }
  return `${minutes}:${String(remainingSeconds).padStart(2, '0')}`;
}

export function showPace(seconds: number, unit: 'km' | 'mi'): string {
  return unit === 'km' ? formatPace(seconds) : formatPace(seconds * 1.609344);
}

export function isGoalDistance(distanceKm: number, goalDistanceKm: number): boolean {
  return Math.abs(distanceKm - goalDistanceKm) < 0.01;
}

export function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds <= 0) {
    return '—';
  }
  const totalSeconds = Math.round(seconds);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const remainingSeconds = totalSeconds % 60;
  return hours > 0
    ? `${hours}:${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`
    : `${minutes}:${String(remainingSeconds).padStart(2, '0')}`;
}
