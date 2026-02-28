import type { CompleteChartSeries } from "../shared/complete-types";

export const completeRadialBarData = [
  { name: "North", value: 60 },
  { name: "South", value: 40 },
  { name: "West", value: 20 },
] as const;

export const completeRadialBarSeries = [
  { label: "North", name: "North" },
  { label: "South", name: "South" },
  { label: "West", name: "West" },
] as const satisfies readonly CompleteChartSeries[];

export const completeRadialBarLabelData = [
  { name: "Mobile", value: 60 },
  { name: "Web", value: 40 },
] as const;

export const completeRadialBarLabelSeries = [
  { label: "Mobile", name: "Mobile" },
  { label: "Web", name: "Web" },
] as const satisfies readonly CompleteChartSeries[];
