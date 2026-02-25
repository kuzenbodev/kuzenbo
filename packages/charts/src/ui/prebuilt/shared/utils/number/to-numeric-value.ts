interface ToNumericValueOptions {
  allowRange?: boolean;
}

const toNumericValue = (
  value: unknown,
  options: ToNumericValueOptions = {}
): number | undefined => {
  if (typeof value === "number") {
    return Number.isFinite(value) ? value : undefined;
  }

  if (typeof value === "string") {
    const parsed = Number(value);

    if (Number.isFinite(parsed)) {
      return parsed;
    }
  }

  if (!options.allowRange || !Array.isArray(value) || value.length < 2) {
    return;
  }

  const [start, end] = value;
  const startNumber = toNumericValue(start);
  const endNumber = toNumericValue(end);

  if (startNumber !== undefined && endNumber !== undefined) {
    return endNumber - startNumber;
  }
};

export { toNumericValue };
