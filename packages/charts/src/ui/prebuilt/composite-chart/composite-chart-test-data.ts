import type { CompleteCompositeSeries } from "../shared/complete-types";

export const completeCompositeMixedData = [
  { month: "Jan", revenue: 91_000, conversionRate: 12.4, pipeline: 143_000 },
  { month: "Feb", revenue: 97_600, conversionRate: 12.9, pipeline: 149_000 },
  { month: "Mar", revenue: 104_500, conversionRate: 13.5, pipeline: 158_000 },
] as const;

export const completeCompositeMixedSeries = [
  { name: "revenue", label: "Revenue", type: "bar", yAxisId: "revenue-axis" },
  {
    name: "conversionRate",
    label: "Conversion",
    type: "line",
    yAxisId: "conversion-axis",
  },
  {
    name: "pipeline",
    label: "Pipeline",
    type: "area",
    yAxisId: "revenue-axis",
  },
] as const satisfies readonly CompleteCompositeSeries[];

export const completeCompositeStackedData = [
  { month: "Jan", direct: 41_000, partner: 22_000, conversionRate: 11.1 },
  { month: "Feb", direct: 43_500, partner: 23_100, conversionRate: 11.5 },
  { month: "Mar", direct: 46_200, partner: 24_700, conversionRate: 11.9 },
] as const;

export const completeCompositeStackedSeries = [
  {
    name: "direct",
    label: "Direct",
    stackId: "revenue",
    type: "bar",
    yAxisId: "revenue-axis",
  },
  {
    name: "partner",
    label: "Partner",
    stackId: "revenue",
    type: "bar",
    yAxisId: "revenue-axis",
  },
  {
    name: "conversionRate",
    label: "Conversion",
    type: "line",
    yAxisId: "conversion-axis",
  },
] as const satisfies readonly CompleteCompositeSeries[];

export const completeCompositeNullZeroData = [
  { month: "Jan", revenue: 84_000, conversionRate: 9.1, pipeline: 118_000 },
  { month: "Feb", revenue: 0, conversionRate: 0, pipeline: 0 },
  { month: "Mar", revenue: null, conversionRate: 9.8, pipeline: 132_500 },
  { month: "Apr", revenue: 96_300, conversionRate: null, pipeline: 141_700 },
] as const;

export const completeCompositeNullZeroSeries = [
  { name: "revenue", label: "Revenue", type: "bar", yAxisId: "revenue-axis" },
  {
    name: "conversionRate",
    label: "Conversion",
    type: "line",
    yAxisId: "conversion-axis",
  },
  {
    name: "pipeline",
    label: "Pipeline",
    type: "area",
    yAxisId: "revenue-axis",
  },
] as const satisfies readonly CompleteCompositeSeries[];
