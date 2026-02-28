import type { CompleteChartSeries } from "../shared/complete-types";

export const radialBarDefaultData = [
  { name: "North America", value: 68 },
  { name: "Europe", value: 52 },
  { name: "APAC", value: 44 },
  { name: "LATAM", value: 29 },
];

export const radialBarDefaultSeries = [
  {
    color: "var(--color-chart-1)",
    label: "North America",
    name: "North America",
  },
  { color: "var(--color-chart-2)", label: "Europe", name: "Europe" },
  { color: "var(--color-chart-3)", label: "APAC", name: "APAC" },
  { color: "var(--color-chart-4)", label: "LATAM", name: "LATAM" },
] satisfies CompleteChartSeries[];
