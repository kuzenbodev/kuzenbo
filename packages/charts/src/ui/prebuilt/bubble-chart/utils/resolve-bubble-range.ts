const DEFAULT_BUBBLE_RANGE: readonly [number, number] = [80, 320];

const resolveBubbleRange = (
  range?: readonly [number, number]
): readonly [number, number] => {
  if (!range) {
    return DEFAULT_BUBBLE_RANGE;
  }

  const [rawMin, rawMax] = range;
  const minSize = Number.isFinite(rawMin) ? Math.max(1, rawMin) : undefined;
  const maxSize = Number.isFinite(rawMax) ? Math.max(1, rawMax) : undefined;

  if (minSize === undefined || maxSize === undefined) {
    return DEFAULT_BUBBLE_RANGE;
  }

  if (minSize <= maxSize) {
    return [minSize, maxSize];
  }

  return [maxSize, minSize];
};

export { resolveBubbleRange, DEFAULT_BUBBLE_RANGE };
