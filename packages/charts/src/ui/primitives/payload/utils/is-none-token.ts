const isNoneToken = (value: unknown): boolean =>
  typeof value === "string" && value.trim().toLowerCase() === "none";

export { isNoneToken };
