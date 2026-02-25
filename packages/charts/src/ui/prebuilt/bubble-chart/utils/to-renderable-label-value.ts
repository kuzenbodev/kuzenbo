const toRenderableLabelValue = (value: unknown): number | string => {
  if (typeof value === "number" || typeof value === "string") {
    return value;
  }

  return String(value);
};

export { toRenderableLabelValue };
