import type { CompleteChartSeries } from "../shared/complete-types";

export const radialBarDefaultData = [
  { name: "North America", value: 68 },
  { name: "Europe", value: 52 },
  { name: "APAC", value: 44 },
  { name: "LATAM", value: 29 },
];

export const radialBarDefaultSeries = [
  {
    name: "North America",
    label: "North America",
    color: "var(--color-chart-1)",
  },
  { name: "Europe", label: "Europe", color: "var(--color-chart-2)" },
  { name: "APAC", label: "APAC", color: "var(--color-chart-3)" },
  { name: "LATAM", label: "LATAM", color: "var(--color-chart-4)" },
] satisfies CompleteChartSeries[];
