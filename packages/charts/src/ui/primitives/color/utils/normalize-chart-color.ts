const normalizeChartColor = (value: string | undefined) => {
  if (!value) {
    return;
  }

  const trimmed = value.trim();

  if (!trimmed) {
    return;
  }

  return trimmed;
};

export { normalizeChartColor };
