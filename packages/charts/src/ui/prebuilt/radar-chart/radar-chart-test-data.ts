import type { CompleteChartSeries } from "../shared/complete-types";

export const completeRadarData = [
  { metric: "Acquisition", actual: 72, target: 80 },
  { metric: "Activation", actual: 67, target: 76 },
  { metric: "Retention", actual: 81, target: 84 },
  { metric: "Revenue", actual: 75, target: 79 },
  { metric: "Referral", actual: 64, target: 70 },
] as const;

export const completeRadarSeries = [
  { name: "actual", label: "Actual" },
  { name: "target", label: "Target", strokeDasharray: "4 4" },
] as const satisfies readonly CompleteChartSeries[];
