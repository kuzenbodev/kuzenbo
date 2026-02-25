const COMPLETE_CHART_COLOR_CYCLE = [
  "var(--color-chart-1)",
  "var(--color-chart-2)",
  "var(--color-chart-3)",
  "var(--color-chart-4)",
  "var(--color-chart-5)",
] as const;

const getFallbackSeriesColor = (index: number) => {
  const color =
    COMPLETE_CHART_COLOR_CYCLE[index % COMPLETE_CHART_COLOR_CYCLE.length];

  return color;
};

export { getFallbackSeriesColor };
