import type { CompleteChartSeries } from "../shared/complete-types";

export const radarDefaultData = [
  { metric: "Reliability", score: 84, benchmark: 90 },
  { metric: "Performance", score: 79, benchmark: 88 },
  { metric: "Security", score: 91, benchmark: 93 },
  { metric: "Usability", score: 76, benchmark: 82 },
  { metric: "Support", score: 81, benchmark: 85 },
  { metric: "Integrations", score: 73, benchmark: 80 },
];

export const radarDefaultSeries = [
  { name: "score", label: "Score", color: "var(--color-chart-1)" },
  {
    name: "benchmark",
    label: "Benchmark",
    color: "var(--color-chart-3)",
    strokeDasharray: "5 3",
  },
] satisfies CompleteChartSeries[];
