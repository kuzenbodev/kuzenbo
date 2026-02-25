const toNumber = (value: unknown) => {
  if (typeof value === "number") {
    return Number.isFinite(value) ? value : undefined;
  }

  if (typeof value !== "string") {
    return;
  }

  const parsed = Number(value);

  if (Number.isFinite(parsed)) {
    return parsed;
  }
};

export { toNumber };
