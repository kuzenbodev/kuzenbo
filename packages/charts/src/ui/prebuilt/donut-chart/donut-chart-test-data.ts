import type { CompleteChartSeries } from "../shared/complete-types";

export const completeDonutTrafficData = [
  { name: "Direct", value: 60 },
  { name: "Referral", value: 30 },
  { name: "Partner", value: 10 },
] as const;

export const completeDonutTrafficSeries = [
  { name: "Direct", label: "Direct" },
  { name: "Referral", label: "Referral" },
  { name: "Partner", label: "Partner" },
] as const satisfies readonly CompleteChartSeries[];

export const completeDonutLabelData = [
  { name: "Organic", value: 60 },
  { name: "Paid", value: 40 },
] as const;

export const completeDonutLabelSeries = [
  { name: "Organic", label: "Organic" },
  { name: "Paid", label: "Paid" },
] as const satisfies readonly CompleteChartSeries[];
