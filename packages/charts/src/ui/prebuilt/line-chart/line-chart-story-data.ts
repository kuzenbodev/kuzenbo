import type { CompleteChartSeries } from "../shared/complete-types";

export const lineDefaultData = [
  { month: "Jan", revenue: 172_000, target: 180_000 },
  { month: "Feb", revenue: 186_000, target: 190_000 },
  { month: "Mar", revenue: 201_000, target: 205_000 },
  { month: "Apr", revenue: 214_500, target: 220_000 },
  { month: "May", revenue: 229_000, target: 235_000 },
  { month: "Jun", revenue: 246_000, target: 250_000 },
];

export const lineDefaultSeries = [
  { name: "revenue", label: "Revenue", color: "var(--color-chart-1)" },
  {
    name: "target",
    label: "Target",
    color: "var(--color-chart-4)",
    yAxisId: "right-axis",
  },
] satisfies CompleteChartSeries[];

export const lineCampaignVsTargetData = [
  { week: "W1", campaignReach: 48_300, targetReach: 50_000 },
  { week: "W2", campaignReach: 52_600, targetReach: 53_000 },
  { week: "W3", campaignReach: 56_200, targetReach: 56_000 },
  { week: "W4", campaignReach: 55_500, targetReach: 59_000 },
  { week: "W5", campaignReach: 63_800, targetReach: 62_000 },
  { week: "W6", campaignReach: 67_900, targetReach: 65_000 },
  { week: "W7", campaignReach: 69_200, targetReach: 68_000 },
  { week: "W8", campaignReach: 72_800, targetReach: 71_000 },
];

export const lineCampaignVsTargetSeries = [
  {
    name: "campaignReach",
    label: "Campaign Reach",
    color: "var(--color-chart-1)",
  },
  {
    name: "targetReach",
    label: "Target Reach",
    color: "var(--color-chart-3)",
    strokeDasharray: "6 4",
  },
] satisfies CompleteChartSeries[];

export const lineKpiDualAxisData = [
  { month: "Jan", activeUsers: 24_100, nps: 39 },
  { month: "Feb", activeUsers: 25_800, nps: 41 },
  { month: "Mar", activeUsers: 27_600, nps: 43 },
  { month: "Apr", activeUsers: 28_900, nps: 45 },
  { month: "May", activeUsers: 30_700, nps: 44 },
  { month: "Jun", activeUsers: 32_100, nps: 46 },
];

export const lineKpiDualAxisSeries = [
  {
    name: "activeUsers",
    label: "Active Users",
    color: "var(--color-chart-2)",
    yAxisId: "left-axis",
  },
  {
    name: "nps",
    label: "NPS",
    color: "var(--color-chart-5)",
    yAxisId: "right-axis",
  },
] satisfies CompleteChartSeries[];

export const lineForecastGapsData = [
  { month: "Jan", actualRevenue: 128_000, forecastRevenue: 130_000 },
  { month: "Feb", actualRevenue: 133_500, forecastRevenue: 136_000 },
  { month: "Mar", actualRevenue: null, forecastRevenue: 141_000 },
  { month: "Apr", actualRevenue: 145_300, forecastRevenue: 146_000 },
  { month: "May", actualRevenue: null, forecastRevenue: 151_500 },
  { month: "Jun", actualRevenue: 157_400, forecastRevenue: 156_000 },
];

export const lineForecastGapsSeries = [
  {
    name: "actualRevenue",
    label: "Actual Revenue",
    color: "var(--color-chart-1)",
  },
  {
    name: "forecastRevenue",
    label: "Forecast Revenue",
    color: "var(--color-chart-4)",
    strokeDasharray: "5 5",
  },
] satisfies CompleteChartSeries[];

export const lineMinimalData = [
  { month: "Jan", velocity: 3.1 },
  { month: "Feb", velocity: 3.4 },
  { month: "Mar", velocity: 3.6 },
  { month: "Apr", velocity: 3.8 },
  { month: "May", velocity: 4.1 },
  { month: "Jun", velocity: 4.3 },
];

export const lineMinimalSeries = [
  { name: "velocity", label: "Velocity", color: "var(--color-chart-2)" },
] satisfies CompleteChartSeries[];

export const lineSmallContainerData = [
  { day: "Mon", signups: 38, activations: 27 },
  { day: "Tue", signups: 42, activations: 29 },
  { day: "Wed", signups: 40, activations: 31 },
  { day: "Thu", signups: 51, activations: 35 },
  { day: "Fri", signups: 57, activations: 39 },
  { day: "Sat", signups: 49, activations: 34 },
  { day: "Sun", signups: 44, activations: 30 },
];

export const lineSmallContainerSeries = [
  { name: "signups", label: "Signups", color: "var(--color-chart-1)" },
  {
    name: "activations",
    label: "Activations",
    color: "var(--color-chart-3)",
  },
] satisfies CompleteChartSeries[];
