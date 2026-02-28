import type { CompleteChartSeries } from "../shared/complete-types";

export const completePieRevenueData = [
  { name: "Starter", value: 50 },
  { name: "Growth", value: 30 },
  { name: "Enterprise", value: 20 },
] as const;

export const completePieRevenueSeries = [
  { label: "Starter", name: "Starter" },
  { label: "Growth", name: "Growth" },
  { label: "Enterprise", name: "Enterprise" },
] as const satisfies readonly CompleteChartSeries[];

export const completePieLabelData = [
  { name: "North", value: 60 },
  { name: "South", value: 40 },
] as const;

export const completePieLabelSeries = [
  { label: "North", name: "North" },
  { label: "South", name: "South" },
] as const satisfies readonly CompleteChartSeries[];
