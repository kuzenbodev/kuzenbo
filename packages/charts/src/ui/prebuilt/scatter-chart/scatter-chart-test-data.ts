import type { ScatterChartSeries } from "./scatter-chart-types";

export const completeScatterSeries = [
  {
    name: "enterprise",
    label: "Enterprise",
    data: [
      { effort: 1.2, impact: 42 },
      { effort: 2.1, impact: 56 },
      { effort: 3.4, impact: 68 },
      { effort: 4.3, impact: 80 },
    ],
  },
  {
    name: "smb",
    label: "SMB",
    data: [
      { effort: 0.9, impact: 34 },
      { effort: 1.6, impact: 47 },
      { effort: 2.7, impact: 61 },
      { effort: 3.1, impact: 69 },
    ],
  },
] as const satisfies readonly ScatterChartSeries[];
