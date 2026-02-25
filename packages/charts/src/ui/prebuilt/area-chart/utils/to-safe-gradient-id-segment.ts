const toSafeGradientIdSegment = (value: string): string => {
  const normalizedValue = value
    .toLowerCase()
    .replaceAll(/[^a-z0-9-]/g, "-")
    .replaceAll(/-+/g, "-")
    .replaceAll(/^-|-$/g, "");

  if (normalizedValue.length === 0) {
    return "series";
  }

  return normalizedValue;
};

export { toSafeGradientIdSegment };
