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
  { name: "revenue", label: "Revenue" },
  { name: "target", label: "Target", strokeDasharray: "6 3" },
] as const satisfies readonly CompleteChartSeries[];

export const completeLineDualAxisSeries = [
  { name: "revenue", label: "Revenue", yAxisId: "left-axis" },
  { name: "target", label: "Target", yAxisId: "right-axis" },
] as const satisfies readonly CompleteChartSeries[];
