import type { CompleteCompositeSeries } from "../shared/complete-types";

export const completeCompositeMixedData = [
  { conversionRate: 12.4, month: "Jan", pipeline: 143_000, revenue: 91_000 },
  { conversionRate: 12.9, month: "Feb", pipeline: 149_000, revenue: 97_600 },
  { conversionRate: 13.5, month: "Mar", pipeline: 158_000, revenue: 104_500 },
] as const;

export const completeCompositeMixedSeries = [
  { label: "Revenue", name: "revenue", type: "bar", yAxisId: "revenue-axis" },
  {
    label: "Conversion",
    name: "conversionRate",
    type: "line",
    yAxisId: "conversion-axis",
  },
  {
    label: "Pipeline",
    name: "pipeline",
    type: "area",
    yAxisId: "revenue-axis",
  },
] as const satisfies readonly CompleteCompositeSeries[];

export const completeCompositeStackedData = [
  { conversionRate: 11.1, direct: 41_000, month: "Jan", partner: 22_000 },
  { conversionRate: 11.5, direct: 43_500, month: "Feb", partner: 23_100 },
  { conversionRate: 11.9, direct: 46_200, month: "Mar", partner: 24_700 },
] as const;

export const completeCompositeStackedSeries = [
  {
    label: "Direct",
    name: "direct",
    stackId: "revenue",
    type: "bar",
    yAxisId: "revenue-axis",
  },
  {
    label: "Partner",
    name: "partner",
    stackId: "revenue",
    type: "bar",
    yAxisId: "revenue-axis",
  },
  {
    label: "Conversion",
    name: "conversionRate",
    type: "line",
    yAxisId: "conversion-axis",
  },
] as const satisfies readonly CompleteCompositeSeries[];

export const completeCompositeNullZeroData = [
  { conversionRate: 9.1, month: "Jan", pipeline: 118_000, revenue: 84_000 },
  { conversionRate: 0, month: "Feb", pipeline: 0, revenue: 0 },
  { conversionRate: 9.8, month: "Mar", pipeline: 132_500, revenue: null },
  { conversionRate: null, month: "Apr", pipeline: 141_700, revenue: 96_300 },
] as const;

export const completeCompositeNullZeroSeries = [
  { label: "Revenue", name: "revenue", type: "bar", yAxisId: "revenue-axis" },
  {
    label: "Conversion",
    name: "conversionRate",
    type: "line",
    yAxisId: "conversion-axis",
  },
  {
    label: "Pipeline",
    name: "pipeline",
    type: "area",
    yAxisId: "revenue-axis",
  },
] as const satisfies readonly CompleteCompositeSeries[];
