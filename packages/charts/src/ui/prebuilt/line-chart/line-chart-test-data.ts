import type { CompleteChartSeries } from "../shared/complete-types";

export const completeLineTrendData = [
  { month: "Jan", revenue: 1200, target: 1400 },
  { month: "Feb", revenue: 1320, target: 1500 },
  { month: "Mar", revenue: 1460, target: 1600 },
  { month: "Apr", revenue: 1580, target: 1710 },
] as const;

export const completeLineGapData = [
  { month: "Jan", revenue: 1200, target: 1400 },
  { month: "Feb", revenue: null, target: 1480 },
  { month: "Mar", revenue: 1510, target: 1600 },
  { month: "Apr", revenue: null, target: 1690 },
] as const;

export const completeLineSeries = [
  { label: "Revenue", name: "revenue" },
  { label: "Target", name: "target", strokeDasharray: "6 3" },
] as const satisfies readonly CompleteChartSeries[];

export const completeLineDualAxisSeries = [
  { label: "Revenue", name: "revenue", yAxisId: "left-axis" },
  { label: "Target", name: "target", yAxisId: "right-axis" },
] as const satisfies readonly CompleteChartSeries[];
