import type { CompleteChartSeries } from "../shared/complete-types";

export const completePieRevenueData = [
  { name: "Starter", value: 50 },
  { name: "Growth", value: 30 },
  { name: "Enterprise", value: 20 },
] as const;

export const completePieRevenueSeries = [
  { name: "Starter", label: "Starter" },
  { name: "Growth", label: "Growth" },
  { name: "Enterprise", label: "Enterprise" },
] as const satisfies readonly CompleteChartSeries[];

export const completePieLabelData = [
  { name: "North", value: 60 },
  { name: "South", value: 40 },
] as const;

export const completePieLabelSeries = [
  { name: "North", label: "North" },
  { name: "South", label: "South" },
] as const satisfies readonly CompleteChartSeries[];
