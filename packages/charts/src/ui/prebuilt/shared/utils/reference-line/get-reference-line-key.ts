const getReferenceLineKey = (
  x: string | number | undefined,
  y: string | number | undefined,
  label: unknown
) => {
  const labelPart =
    typeof label === "string" || typeof label === "number"
      ? String(label)
      : "custom-label";

  return `reference-line-${String(x ?? "x")}-${String(y ?? "y")}-${labelPart}`;
};

export { getReferenceLineKey };
