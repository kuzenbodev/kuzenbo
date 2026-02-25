import type { CompleteChartSeries } from "../shared/complete-types";

export const completeBarGroupedData = [
  { month: "Jan", organic: 320, paid: 180 },
  { month: "Feb", organic: 360, paid: 210 },
  { month: "Mar", organic: 390, paid: 240 },
] as const;

export const completeBarGroupedSeries = [
  { name: "organic", label: "Organic" },
  { name: "paid", label: "Paid" },
] as const satisfies readonly CompleteChartSeries[];

export const completeBarStackedSeries = [
  { name: "organic", label: "Organic", stackId: "acq" },
  { name: "paid", label: "Paid", stackId: "acq" },
] as const satisfies readonly CompleteChartSeries[];

export const completeBarNegativeData = [
  { month: "Jan", inflow: 42, outflow: -18 },
  { month: "Feb", inflow: 39, outflow: -21 },
  { month: "Mar", inflow: 45, outflow: -23 },
  { month: "Apr", inflow: 47, outflow: -28 },
] as const;

export const completeBarNegativeSeries = [
  { name: "inflow", label: "Inflow" },
  { name: "outflow", label: "Outflow" },
] as const satisfies readonly CompleteChartSeries[];

export const completeBarDualAxisData = [
  { month: "Jan", spend: 41_000, leads: 840 },
  { month: "Feb", spend: 44_500, leads: 900 },
  { month: "Mar", spend: 47_800, leads: 958 },
  { month: "Apr", spend: 49_200, leads: 1006 },
] as const;

export const completeBarDualAxisSeries = [
  { name: "spend", label: "Spend", yAxisId: "left-axis" },
  { name: "leads", label: "Leads", yAxisId: "right-axis" },
] as const satisfies readonly CompleteChartSeries[];
