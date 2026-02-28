type ComparableRecord = Record<string, unknown>;

const isNaNValue = (value: unknown): value is number =>
  typeof value === "number" && Number.isNaN(value);

export const shallowEqual = (a?: unknown, b?: unknown) => {
  if (a === b) {
    return true;
  }

  if (isNaNValue(a) && isNaNValue(b)) {
    return true;
  }

  if (
    typeof a !== "object" ||
    a === null ||
    typeof b !== "object" ||
    b === null
  ) {
    return false;
  }

  const aRecord = a as ComparableRecord;
  const bRecord = b as ComparableRecord;
  const keys = Object.keys(aRecord);

  if (keys.length !== Object.keys(bRecord).length) {
    return false;
  }

  for (const key of keys) {
    if (!(key in bRecord)) {
      return false;
    }

    const aValue = aRecord[key];
    const bValue = bRecord[key];

    if (aValue !== bValue && !(isNaNValue(aValue) && isNaNValue(bValue))) {
      return false;
    }
  }

  return true;
};
