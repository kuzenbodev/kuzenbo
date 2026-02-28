import type { CompleteChartSeries } from "../shared/complete-types";

export const completeAreaTrendData = [
  { month: "Jan", revenue: 1280, target: 1360 },
  { month: "Feb", revenue: 1340, target: 1420 },
  { month: "Mar", revenue: 1410, target: 1490 },
  { month: "Apr", revenue: 1480, target: 1550 },
] as const;

export const completeAreaSeries = [
  { label: "Revenue", name: "revenue" },
  { label: "Target", name: "target" },
] as const satisfies readonly CompleteChartSeries[];

export const completeAreaDualAxisData = [
  { conversionRate: 11.2, month: "Jan", mrr: 92_000 },
  { conversionRate: 12.4, month: "Feb", mrr: 96_500 },
  { conversionRate: 13.1, month: "Mar", mrr: 101_200 },
  { conversionRate: 13.9, month: "Apr", mrr: 106_800 },
] as const;

export const completeAreaDualAxisSeries = [
  { label: "MRR", name: "mrr", yAxisId: "left-axis" },
  { label: "Conversion", name: "conversionRate", yAxisId: "right-axis" },
] as const satisfies readonly CompleteChartSeries[];

export const completeAreaSignedData = [
  { marketing: 320, month: "Jan", support: -120 },
  { marketing: 340, month: "Feb", support: -150 },
  { marketing: 365, month: "Mar", support: -130 },
  { marketing: 352, month: "Apr", support: -160 },
] as const;

export const completeAreaSignedSeries = [
  { label: "Marketing", name: "marketing" },
  { label: "Support", name: "support" },
] as const satisfies readonly CompleteChartSeries[];
