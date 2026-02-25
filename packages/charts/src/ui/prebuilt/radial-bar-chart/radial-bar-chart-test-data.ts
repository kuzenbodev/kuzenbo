import type { CompleteChartSeries } from "../shared/complete-types";

export const completeRadialBarData = [
  { name: "North", value: 60 },
  { name: "South", value: 40 },
  { name: "West", value: 20 },
] as const;

export const completeRadialBarSeries = [
  { name: "North", label: "North" },
  { name: "South", label: "South" },
  { name: "West", label: "West" },
] as const satisfies readonly CompleteChartSeries[];

export const completeRadialBarLabelData = [
  { name: "Mobile", value: 60 },
  { name: "Web", value: 40 },
] as const;

export const completeRadialBarLabelSeries = [
  { name: "Mobile", label: "Mobile" },
  { name: "Web", label: "Web" },
] as const satisfies readonly CompleteChartSeries[];
