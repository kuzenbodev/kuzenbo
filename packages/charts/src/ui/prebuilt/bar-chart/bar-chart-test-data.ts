import type { CompleteChartSeries } from "../shared/complete-types";

export const completeBarGroupedData = [
  { month: "Jan", organic: 320, paid: 180 },
  { month: "Feb", organic: 360, paid: 210 },
  { month: "Mar", organic: 390, paid: 240 },
] as const;

export const completeBarGroupedSeries = [
  { label: "Organic", name: "organic" },
  { label: "Paid", name: "paid" },
] as const satisfies readonly CompleteChartSeries[];

export const completeBarStackedSeries = [
  { label: "Organic", name: "organic", stackId: "acq" },
  { label: "Paid", name: "paid", stackId: "acq" },
] as const satisfies readonly CompleteChartSeries[];

export const completeBarNegativeData = [
  { inflow: 42, month: "Jan", outflow: -18 },
  { inflow: 39, month: "Feb", outflow: -21 },
  { inflow: 45, month: "Mar", outflow: -23 },
  { inflow: 47, month: "Apr", outflow: -28 },
] as const;

export const completeBarNegativeSeries = [
  { label: "Inflow", name: "inflow" },
  { label: "Outflow", name: "outflow" },
] as const satisfies readonly CompleteChartSeries[];

export const completeBarDualAxisData = [
  { leads: 840, month: "Jan", spend: 41_000 },
  { leads: 900, month: "Feb", spend: 44_500 },
  { leads: 958, month: "Mar", spend: 47_800 },
  { leads: 1006, month: "Apr", spend: 49_200 },
] as const;

export const completeBarDualAxisSeries = [
  { label: "Spend", name: "spend", yAxisId: "left-axis" },
  { label: "Leads", name: "leads", yAxisId: "right-axis" },
] as const satisfies readonly CompleteChartSeries[];
