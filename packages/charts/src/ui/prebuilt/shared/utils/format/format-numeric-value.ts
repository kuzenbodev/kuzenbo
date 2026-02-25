const formatNumericValue = (value: number, unit: string | undefined) => {
  const formatted = value.toLocaleString();

  if (!unit) {
    return formatted;
  }

  return `${formatted} ${unit}`;
};

export { formatNumericValue };
