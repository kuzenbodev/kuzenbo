import type { ScatterChartSeries } from "./scatter-chart-types";

export const scatterDefaultSeries = [
  {
    name: "enterprise",
    label: "Enterprise",
    color: "var(--color-chart-1)",
    data: [
      { effort: 1.2, impact: 42 },
      { effort: 2.1, impact: 56 },
      { effort: 3.4, impact: 68 },
      { effort: 4.3, impact: 80 },
      { effort: 5.1, impact: 88 },
    ],
  },
  {
    name: "smb",
    label: "SMB",
    color: "var(--color-chart-3)",
    data: [
      { effort: 0.9, impact: 34 },
      { effort: 1.6, impact: 47 },
      { effort: 2.7, impact: 61 },
      { effort: 3.1, impact: 69 },
      { effort: 3.8, impact: 74 },
    ],
  },
] satisfies ScatterChartSeries[];

export const scatterAxisFocusSeries = [
  {
    name: "pipeline",
    label: "Pipeline",
    color: "var(--color-chart-2)",
    data: [
      { conversionRate: 2.4, cycleDays: 58 },
      { conversionRate: 3, cycleDays: 54 },
      { conversionRate: 3.3, cycleDays: 51 },
      { conversionRate: 3.8, cycleDays: 47 },
      { conversionRate: 4.2, cycleDays: 44 },
    ],
  },
  {
    name: "retention",
    label: "Retention",
    color: "var(--color-chart-5)",
    data: [
      { conversionRate: 2.1, cycleDays: 61 },
      { conversionRate: 2.7, cycleDays: 57 },
      { conversionRate: 3.1, cycleDays: 52 },
      { conversionRate: 3.5, cycleDays: 49 },
      { conversionRate: 3.9, cycleDays: 45 },
    ],
  },
] satisfies ScatterChartSeries[];

export const scatterPointLabelSeries = [
  {
    name: "priority",
    label: "Priority Initiatives",
    color: "var(--color-chart-4)",
    data: [
      { complexity: 2.1, value: 78, score: 9.2 },
      { complexity: 1.4, value: 66, score: 8.1 },
      { complexity: 3.2, value: 91, score: 9.8 },
      { complexity: 2.6, value: 84, score: 9 },
    ],
  },
] satisfies ScatterChartSeries[];
