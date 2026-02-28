import type { CompleteChartSeries } from "../shared/complete-types";

export const completeDonutTrafficData = [
  { name: "Direct", value: 60 },
  { name: "Referral", value: 30 },
  { name: "Partner", value: 10 },
] as const;

export const completeDonutTrafficSeries = [
  { label: "Direct", name: "Direct" },
  { label: "Referral", name: "Referral" },
  { label: "Partner", name: "Partner" },
] as const satisfies readonly CompleteChartSeries[];

export const completeDonutLabelData = [
  { name: "Organic", value: 60 },
  { name: "Paid", value: 40 },
] as const;

export const completeDonutLabelSeries = [
  { label: "Organic", name: "Organic" },
  { label: "Paid", name: "Paid" },
] as const satisfies readonly CompleteChartSeries[];
