import type { BubbleChartSeries } from "./bubble-chart-types";

export const bubbleDefaultSeries = [
  {
    name: "enterprise",
    label: "Enterprise",
    color: "var(--color-chart-1)",
    data: [
      { satisfaction: 72, velocity: 3.1, volume: 140 },
      { satisfaction: 78, velocity: 3.4, volume: 180 },
      { satisfaction: 83, velocity: 3.9, volume: 230 },
      { satisfaction: 88, velocity: 4.4, volume: 280 },
      { satisfaction: 91, velocity: 4.8, volume: 320 },
    ],
  },
  {
    name: "smb",
    label: "SMB",
    color: "var(--color-chart-3)",
    data: [
      { satisfaction: 64, velocity: 2.8, volume: 95 },
      { satisfaction: 69, velocity: 3.2, volume: 125 },
      { satisfaction: 74, velocity: 3.6, volume: 160 },
      { satisfaction: 79, velocity: 4, volume: 196 },
      { satisfaction: 82, velocity: 4.2, volume: 220 },
    ],
  },
] satisfies BubbleChartSeries[];

export const bubbleRangeSeries = [
  {
    name: "growth",
    label: "Growth",
    color: "var(--color-chart-2)",
    data: [
      { scoreX: 12, scoreY: 41, dealSize: 12 },
      { scoreX: 18, scoreY: 49, dealSize: 22 },
      { scoreX: 24, scoreY: 54, dealSize: 32 },
      { scoreX: 29, scoreY: 61, dealSize: 48 },
      { scoreX: 35, scoreY: 66, dealSize: 62 },
    ],
  },
  {
    name: "efficiency",
    label: "Efficiency",
    color: "var(--color-chart-5)",
    data: [
      { scoreX: 10, scoreY: 36, dealSize: 9 },
      { scoreX: 15, scoreY: 45, dealSize: 15 },
      { scoreX: 20, scoreY: 51, dealSize: 24 },
      { scoreX: 26, scoreY: 58, dealSize: 38 },
      { scoreX: 31, scoreY: 63, dealSize: 52 },
    ],
  },
] satisfies BubbleChartSeries[];

export const bubblePointLabelSeries = [
  {
    name: "priority",
    label: "Priority Accounts",
    color: "var(--color-chart-4)",
    data: [
      { complexity: 1.8, value: 68, potential: 44, score: "A" },
      { complexity: 2.4, value: 73, potential: 59, score: "B" },
      { complexity: 3, value: 79, potential: 76, score: "C" },
      { complexity: 3.5, value: 86, potential: 92, score: "D" },
    ],
  },
] satisfies BubbleChartSeries[];
