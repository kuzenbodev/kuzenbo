import type { CompleteChartSeries } from "../shared/complete-types";

export const completeRadarData = [
  { actual: 72, metric: "Acquisition", target: 80 },
  { actual: 67, metric: "Activation", target: 76 },
  { actual: 81, metric: "Retention", target: 84 },
  { actual: 75, metric: "Revenue", target: 79 },
  { actual: 64, metric: "Referral", target: 70 },
] as const;

export const completeRadarSeries = [
  { label: "Actual", name: "actual" },
  { label: "Target", name: "target", strokeDasharray: "4 4" },
] as const satisfies readonly CompleteChartSeries[];
