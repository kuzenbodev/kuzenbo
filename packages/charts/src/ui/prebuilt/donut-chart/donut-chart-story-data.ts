import type { CompleteChartSeries } from "../shared/complete-types";

export const donutDefaultData = [
  { name: "Direct", value: 430 },
  { name: "Organic", value: 290 },
  { name: "Paid", value: 180 },
  { name: "Partners", value: 120 },
];

export const donutDefaultSeries = [
  { name: "Direct", label: "Direct", color: "var(--color-chart-1)" },
  { name: "Organic", label: "Organic", color: "var(--color-chart-2)" },
  { name: "Paid", label: "Paid", color: "var(--color-chart-3)" },
  { name: "Partners", label: "Partners", color: "var(--color-chart-4)" },
] satisfies CompleteChartSeries[];
