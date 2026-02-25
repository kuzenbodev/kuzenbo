import type { CompleteChartSeries } from "../shared/complete-types";

export const pieDefaultData = [
  { name: "Product", value: 480 },
  { name: "Services", value: 210 },
  { name: "Support", value: 135 },
  { name: "Other", value: 72 },
];

export const pieDefaultSeries = [
  { name: "Product", label: "Product", color: "var(--color-chart-1)" },
  { name: "Services", label: "Services", color: "var(--color-chart-2)" },
  { name: "Support", label: "Support", color: "var(--color-chart-3)" },
  { name: "Other", label: "Other", color: "var(--color-chart-4)" },
] satisfies CompleteChartSeries[];
