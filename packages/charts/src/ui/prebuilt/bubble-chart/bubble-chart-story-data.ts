import type { BubbleChartSeries } from "./bubble-chart-types";

export const bubbleDefaultSeries = [
  {
    color: "var(--color-chart-1)",
    data: [
      { satisfaction: 72, velocity: 3.1, volume: 140 },
      { satisfaction: 78, velocity: 3.4, volume: 180 },
      { satisfaction: 83, velocity: 3.9, volume: 230 },
      { satisfaction: 88, velocity: 4.4, volume: 280 },
      { satisfaction: 91, velocity: 4.8, volume: 320 },
    ],
    label: "Enterprise",
    name: "enterprise",
  },
  {
    color: "var(--color-chart-3)",
    data: [
      { satisfaction: 64, velocity: 2.8, volume: 95 },
      { satisfaction: 69, velocity: 3.2, volume: 125 },
      { satisfaction: 74, velocity: 3.6, volume: 160 },
      { satisfaction: 79, velocity: 4, volume: 196 },
      { satisfaction: 82, velocity: 4.2, volume: 220 },
    ],
    label: "SMB",
    name: "smb",
  },
] satisfies BubbleChartSeries[];

export const bubbleRangeSeries = [
  {
    color: "var(--color-chart-2)",
    data: [
      { dealSize: 12, scoreX: 12, scoreY: 41 },
      { dealSize: 22, scoreX: 18, scoreY: 49 },
      { dealSize: 32, scoreX: 24, scoreY: 54 },
      { dealSize: 48, scoreX: 29, scoreY: 61 },
      { dealSize: 62, scoreX: 35, scoreY: 66 },
    ],
    label: "Growth",
    name: "growth",
  },
  {
    color: "var(--color-chart-5)",
    data: [
      { dealSize: 9, scoreX: 10, scoreY: 36 },
      { dealSize: 15, scoreX: 15, scoreY: 45 },
      { dealSize: 24, scoreX: 20, scoreY: 51 },
      { dealSize: 38, scoreX: 26, scoreY: 58 },
      { dealSize: 52, scoreX: 31, scoreY: 63 },
    ],
    label: "Efficiency",
    name: "efficiency",
  },
] satisfies BubbleChartSeries[];

export const bubblePointLabelSeries = [
  {
    color: "var(--color-chart-4)",
    data: [
      { complexity: 1.8, potential: 44, score: "A", value: 68 },
      { complexity: 2.4, potential: 59, score: "B", value: 73 },
      { complexity: 3, potential: 76, score: "C", value: 79 },
      { complexity: 3.5, potential: 92, score: "D", value: 86 },
    ],
    label: "Priority Accounts",
    name: "priority",
  },
] satisfies BubbleChartSeries[];
