import type { BubbleChartSeries } from "./bubble-chart-types";

export const completeBubbleSeries = [
  {
    data: [
      { satisfaction: 72, velocity: 3.1, volume: 140 },
      { satisfaction: 78, velocity: 3.4, volume: 180 },
      { satisfaction: 83, velocity: 3.9, volume: 230 },
      { satisfaction: 88, velocity: 4.4, volume: 280 },
    ],
    label: "Enterprise",
    name: "enterprise",
  },
  {
    data: [
      { satisfaction: 64, velocity: 2.8, volume: 95 },
      { satisfaction: 69, velocity: 3.2, volume: 125 },
      { satisfaction: 74, velocity: 3.6, volume: 160 },
      { satisfaction: 79, velocity: 4, volume: 196 },
    ],
    label: "SMB",
    name: "smb",
  },
] as const satisfies readonly BubbleChartSeries[];
