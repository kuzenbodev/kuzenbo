const SIMPLE_STRING_PATTERN = /^[\w -]+$/;

export const serializePlaygroundProp = (
  prop: string,
  value?: unknown
): string | null => {
  if (value === undefined) {
    return null;
  }

  if (typeof value === "boolean") {
    return value ? prop : `${prop}={false}`;
  }

  if (typeof value === "number") {
    return Number.isFinite(value) ? `${prop}={${value}}` : null;
  }

  if (typeof value === "string") {
    if (SIMPLE_STRING_PATTERN.test(value)) {
      return `${prop}="${value}"`;
    }

    return `${prop}={${JSON.stringify(value)}}`;
  }

  if (value === null) {
    return `${prop}={null}`;
  }

  return `${prop}={${JSON.stringify(value)}}`;
};
