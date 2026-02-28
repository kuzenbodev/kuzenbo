import type { CompleteChartSeries } from "../shared/complete-types";

export const radarDefaultData = [
  { benchmark: 90, metric: "Reliability", score: 84 },
  { benchmark: 88, metric: "Performance", score: 79 },
  { benchmark: 93, metric: "Security", score: 91 },
  { benchmark: 82, metric: "Usability", score: 76 },
  { benchmark: 85, metric: "Support", score: 81 },
  { benchmark: 80, metric: "Integrations", score: 73 },
];

export const radarDefaultSeries = [
  { color: "var(--color-chart-1)", label: "Score", name: "score" },
  {
    color: "var(--color-chart-3)",
    label: "Benchmark",
    name: "benchmark",
    strokeDasharray: "5 3",
  },
] satisfies CompleteChartSeries[];
