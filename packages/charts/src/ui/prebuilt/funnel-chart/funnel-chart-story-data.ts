import type { CompleteChartSeries } from "../shared/complete-types";

export const funnelDefaultData = [
  { name: "Sessions", value: 15_400 },
  { name: "Activated", value: 8740 },
  { name: "Trials", value: 4280 },
  { name: "Paid", value: 1920 },
  { name: "Renewed", value: 1130 },
];

export const funnelDefaultSeries = [
  { color: "var(--color-chart-1)", label: "Sessions", name: "Sessions" },
  { color: "var(--color-chart-2)", label: "Activated", name: "Activated" },
  { color: "var(--color-chart-3)", label: "Trials", name: "Trials" },
  { color: "var(--color-chart-4)", label: "Paid", name: "Paid" },
  { color: "var(--color-chart-5)", label: "Renewed", name: "Renewed" },
] satisfies CompleteChartSeries[];
