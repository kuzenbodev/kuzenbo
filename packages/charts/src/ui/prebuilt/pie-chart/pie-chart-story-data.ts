import type { CompleteChartSeries } from "../shared/complete-types";

export const pieDefaultData = [
  { name: "Product", value: 480 },
  { name: "Services", value: 210 },
  { name: "Support", value: 135 },
  { name: "Other", value: 72 },
];

export const pieDefaultSeries = [
  { color: "var(--color-chart-1)", label: "Product", name: "Product" },
  { color: "var(--color-chart-2)", label: "Services", name: "Services" },
  { color: "var(--color-chart-3)", label: "Support", name: "Support" },
  { color: "var(--color-chart-4)", label: "Other", name: "Other" },
] satisfies CompleteChartSeries[];
