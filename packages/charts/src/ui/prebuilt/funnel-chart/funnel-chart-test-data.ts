import type { CompleteChartSeries } from "../shared/complete-types";

export const completeFunnelStageData = [
  { name: "Visits", value: 1200 },
  { name: "Signups", value: 620 },
  { name: "Qualified", value: 340 },
  { name: "Closed", value: 140 },
] as const;

export const completeFunnelStageSeries = [
  { label: "Visits", name: "Visits" },
  { label: "Signups", name: "Signups" },
  { label: "Qualified", name: "Qualified" },
  { label: "Closed", name: "Closed" },
] as const satisfies readonly CompleteChartSeries[];
