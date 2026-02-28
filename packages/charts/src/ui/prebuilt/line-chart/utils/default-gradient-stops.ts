import type { LineChartGradientStop } from "../../shared/complete-types";

const DEFAULT_LINE_GRADIENT_STOPS: readonly LineChartGradientStop[] = [
  { color: "var(--color-chart-1)", offset: 0 },
  { color: "var(--color-chart-5)", offset: 100 },
] as const;

export { DEFAULT_LINE_GRADIENT_STOPS };
