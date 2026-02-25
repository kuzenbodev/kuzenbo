import type { CompleteChartSeries } from "../shared/complete-types";

export const completeFunnelStageData = [
  { name: "Visits", value: 1200 },
  { name: "Signups", value: 620 },
  { name: "Qualified", value: 340 },
  { name: "Closed", value: 140 },
] as const;

export const completeFunnelStageSeries = [
  { name: "Visits", label: "Visits" },
  { name: "Signups", label: "Signups" },
  { name: "Qualified", label: "Qualified" },
  { name: "Closed", label: "Closed" },
] as const satisfies readonly CompleteChartSeries[];
