import type { CompleteChartSeries } from "../shared/complete-types";

export const funnelDefaultData = [
  { name: "Sessions", value: 15_400 },
  { name: "Activated", value: 8740 },
  { name: "Trials", value: 4280 },
  { name: "Paid", value: 1920 },
  { name: "Renewed", value: 1130 },
];

export const funnelDefaultSeries = [
  { name: "Sessions", label: "Sessions", color: "var(--color-chart-1)" },
  { name: "Activated", label: "Activated", color: "var(--color-chart-2)" },
  { name: "Trials", label: "Trials", color: "var(--color-chart-3)" },
  { name: "Paid", label: "Paid", color: "var(--color-chart-4)" },
  { name: "Renewed", label: "Renewed", color: "var(--color-chart-5)" },
] satisfies CompleteChartSeries[];
