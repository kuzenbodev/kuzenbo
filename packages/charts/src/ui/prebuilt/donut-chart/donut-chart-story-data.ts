import type { CompleteChartSeries } from "../shared/complete-types";

export const donutDefaultData = [
  { name: "Direct", value: 430 },
  { name: "Organic", value: 290 },
  { name: "Paid", value: 180 },
  { name: "Partners", value: 120 },
];

export const donutDefaultSeries = [
  { color: "var(--color-chart-1)", label: "Direct", name: "Direct" },
  { color: "var(--color-chart-2)", label: "Organic", name: "Organic" },
  { color: "var(--color-chart-3)", label: "Paid", name: "Paid" },
  { color: "var(--color-chart-4)", label: "Partners", name: "Partners" },
] satisfies CompleteChartSeries[];
