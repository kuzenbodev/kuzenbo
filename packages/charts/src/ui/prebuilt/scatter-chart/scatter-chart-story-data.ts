import type { ScatterChartSeries } from "./scatter-chart-types";

export const scatterDefaultSeries = [
  {
    color: "var(--color-chart-1)",
    data: [
      { effort: 1.2, impact: 42 },
      { effort: 2.1, impact: 56 },
      { effort: 3.4, impact: 68 },
      { effort: 4.3, impact: 80 },
      { effort: 5.1, impact: 88 },
    ],
    label: "Enterprise",
    name: "enterprise",
  },
  {
    color: "var(--color-chart-3)",
    data: [
      { effort: 0.9, impact: 34 },
      { effort: 1.6, impact: 47 },
      { effort: 2.7, impact: 61 },
      { effort: 3.1, impact: 69 },
      { effort: 3.8, impact: 74 },
    ],
    label: "SMB",
    name: "smb",
  },
] satisfies ScatterChartSeries[];

export const scatterAxisFocusSeries = [
  {
    color: "var(--color-chart-2)",
    data: [
      { conversionRate: 2.4, cycleDays: 58 },
      { conversionRate: 3, cycleDays: 54 },
      { conversionRate: 3.3, cycleDays: 51 },
      { conversionRate: 3.8, cycleDays: 47 },
      { conversionRate: 4.2, cycleDays: 44 },
    ],
    label: "Pipeline",
    name: "pipeline",
  },
  {
    color: "var(--color-chart-5)",
    data: [
      { conversionRate: 2.1, cycleDays: 61 },
      { conversionRate: 2.7, cycleDays: 57 },
      { conversionRate: 3.1, cycleDays: 52 },
      { conversionRate: 3.5, cycleDays: 49 },
      { conversionRate: 3.9, cycleDays: 45 },
    ],
    label: "Retention",
    name: "retention",
  },
] satisfies ScatterChartSeries[];

export const scatterPointLabelSeries = [
  {
    color: "var(--color-chart-4)",
    data: [
      { complexity: 2.1, score: 9.2, value: 78 },
      { complexity: 1.4, score: 8.1, value: 66 },
      { complexity: 3.2, score: 9.8, value: 91 },
      { complexity: 2.6, score: 9, value: 84 },
    ],
    label: "Priority Initiatives",
    name: "priority",
  },
] satisfies ScatterChartSeries[];
