import type { CompleteChartSeries } from "../shared/complete-types";

export const areaDefaultData = [
  { month: "Jan", newMrr: 86_000, retainedMrr: 73_000 },
  { month: "Feb", newMrr: 91_200, retainedMrr: 77_000 },
  { month: "Mar", newMrr: 97_100, retainedMrr: 81_400 },
  { month: "Apr", newMrr: 102_600, retainedMrr: 85_500 },
  { month: "May", newMrr: 108_900, retainedMrr: 90_300 },
  { month: "Jun", newMrr: 114_000, retainedMrr: 94_100 },
];

export const areaDefaultSeries = [
  { name: "newMrr", label: "New MRR", color: "var(--color-chart-1)" },
  {
    name: "retainedMrr",
    label: "Retained MRR",
    color: "var(--color-chart-3)",
  },
] satisfies CompleteChartSeries[];

export const areaStackedDemandData = [
  { week: "W1", selfServe: 420, salesAssist: 210, partner: 110 },
  { week: "W2", selfServe: 448, salesAssist: 226, partner: 116 },
  { week: "W3", selfServe: 472, salesAssist: 238, partner: 124 },
  { week: "W4", selfServe: 491, salesAssist: 254, partner: 133 },
  { week: "W5", selfServe: 515, salesAssist: 268, partner: 140 },
  { week: "W6", selfServe: 538, salesAssist: 281, partner: 148 },
];

export const areaStackedDemandSeries = [
  { name: "selfServe", label: "Self-Serve", color: "var(--color-chart-1)" },
  {
    name: "salesAssist",
    label: "Sales Assist",
    color: "var(--color-chart-2)",
  },
  { name: "partner", label: "Partner", color: "var(--color-chart-4)" },
] satisfies CompleteChartSeries[];

export const areaPercentMixData = [
  { quarter: "Q1", product: 44, services: 32, support: 24 },
  { quarter: "Q2", product: 46, services: 31, support: 23 },
  { quarter: "Q3", product: 48, services: 30, support: 22 },
  { quarter: "Q4", product: 50, services: 29, support: 21 },
];

export const areaPercentMixSeries = [
  { name: "product", label: "Product", color: "var(--color-chart-1)" },
  { name: "services", label: "Services", color: "var(--color-chart-3)" },
  { name: "support", label: "Support", color: "var(--color-chart-5)" },
] satisfies CompleteChartSeries[];

export const areaSplitSignalData = [
  { month: "Jan", positiveFlow: 280, negativeFlow: -140 },
  { month: "Feb", positiveFlow: 320, negativeFlow: -170 },
  { month: "Mar", positiveFlow: 350, negativeFlow: -190 },
  { month: "Apr", positiveFlow: 340, negativeFlow: -180 },
  { month: "May", positiveFlow: 365, negativeFlow: -205 },
  { month: "Jun", positiveFlow: 390, negativeFlow: -214 },
];

export const areaSplitSignalSeries = [
  {
    name: "positiveFlow",
    label: "Positive Flow",
    color: "var(--color-chart-2)",
    curveType: "natural",
  },
  {
    name: "negativeFlow",
    label: "Negative Flow",
    color: "var(--color-chart-5)",
    curveType: "stepAfter",
  },
] satisfies CompleteChartSeries[];
