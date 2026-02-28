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
  { color: "var(--color-chart-1)", label: "New MRR", name: "newMrr" },
  {
    color: "var(--color-chart-3)",
    label: "Retained MRR",
    name: "retainedMrr",
  },
] satisfies CompleteChartSeries[];

export const areaStackedDemandData = [
  { partner: 110, salesAssist: 210, selfServe: 420, week: "W1" },
  { partner: 116, salesAssist: 226, selfServe: 448, week: "W2" },
  { partner: 124, salesAssist: 238, selfServe: 472, week: "W3" },
  { partner: 133, salesAssist: 254, selfServe: 491, week: "W4" },
  { partner: 140, salesAssist: 268, selfServe: 515, week: "W5" },
  { partner: 148, salesAssist: 281, selfServe: 538, week: "W6" },
];

export const areaStackedDemandSeries = [
  { color: "var(--color-chart-1)", label: "Self-Serve", name: "selfServe" },
  {
    color: "var(--color-chart-2)",
    label: "Sales Assist",
    name: "salesAssist",
  },
  { color: "var(--color-chart-4)", label: "Partner", name: "partner" },
] satisfies CompleteChartSeries[];

export const areaPercentMixData = [
  { product: 44, quarter: "Q1", services: 32, support: 24 },
  { product: 46, quarter: "Q2", services: 31, support: 23 },
  { product: 48, quarter: "Q3", services: 30, support: 22 },
  { product: 50, quarter: "Q4", services: 29, support: 21 },
];

export const areaPercentMixSeries = [
  { color: "var(--color-chart-1)", label: "Product", name: "product" },
  { color: "var(--color-chart-3)", label: "Services", name: "services" },
  { color: "var(--color-chart-5)", label: "Support", name: "support" },
] satisfies CompleteChartSeries[];

export const areaSplitSignalData = [
  { month: "Jan", negativeFlow: -140, positiveFlow: 280 },
  { month: "Feb", negativeFlow: -170, positiveFlow: 320 },
  { month: "Mar", negativeFlow: -190, positiveFlow: 350 },
  { month: "Apr", negativeFlow: -180, positiveFlow: 340 },
  { month: "May", negativeFlow: -205, positiveFlow: 365 },
  { month: "Jun", negativeFlow: -214, positiveFlow: 390 },
];

export const areaSplitSignalSeries = [
  {
    color: "var(--color-chart-2)",
    curveType: "natural",
    label: "Positive Flow",
    name: "positiveFlow",
  },
  {
    color: "var(--color-chart-5)",
    curveType: "stepAfter",
    label: "Negative Flow",
    name: "negativeFlow",
  },
] satisfies CompleteChartSeries[];
