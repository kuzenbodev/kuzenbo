export const lowerFirst = (value: string) => {
  if (typeof value === "string") {
    return value.charAt(0).toLowerCase() + value.slice(1);
  }

  return "";
};
