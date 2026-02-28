export const clamp = (value: number, min?: number, max?: number) => {
  if (min === undefined && max === undefined) {
    return value;
  }

  if (min !== undefined && max === undefined) {
    return Math.max(value, min);
  }

  if (min === undefined && max !== undefined) {
    return Math.min(value, max);
  }

  const lowerBound = min ?? value;
  const upperBound = max ?? value;
  return Math.min(Math.max(value, lowerBound), upperBound);
};
