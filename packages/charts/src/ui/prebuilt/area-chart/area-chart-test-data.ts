import type { CompleteChartSeries } from "../shared/complete-types";

export const completeAreaTrendData = [
  { month: "Jan", revenue: 1280, target: 1360 },
  { month: "Feb", revenue: 1340, target: 1420 },
  { month: "Mar", revenue: 1410, target: 1490 },
  { month: "Apr", revenue: 1480, target: 1550 },
] as const;

export const completeAreaSeries = [
  { name: "revenue", label: "Revenue" },
  { name: "target", label: "Target" },
] as const satisfies readonly CompleteChartSeries[];

export const completeAreaDualAxisData = [
  { month: "Jan", mrr: 92_000, conversionRate: 11.2 },
  { month: "Feb", mrr: 96_500, conversionRate: 12.4 },
  { month: "Mar", mrr: 101_200, conversionRate: 13.1 },
  { month: "Apr", mrr: 106_800, conversionRate: 13.9 },
] as const;

export const completeAreaDualAxisSeries = [
  { name: "mrr", label: "MRR", yAxisId: "left-axis" },
  { name: "conversionRate", label: "Conversion", yAxisId: "right-axis" },
] as const satisfies readonly CompleteChartSeries[];

export const completeAreaSignedData = [
  { month: "Jan", marketing: 320, support: -120 },
  { month: "Feb", marketing: 340, support: -150 },
  { month: "Mar", marketing: 365, support: -130 },
  { month: "Apr", marketing: 352, support: -160 },
] as const;

export const completeAreaSignedSeries = [
  { name: "marketing", label: "Marketing" },
  { name: "support", label: "Support" },
] as const satisfies readonly CompleteChartSeries[];
