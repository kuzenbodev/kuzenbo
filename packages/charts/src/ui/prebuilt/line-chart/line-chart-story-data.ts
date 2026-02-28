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
  { color: "var(--color-chart-1)", label: "Revenue", name: "revenue" },
  {
    color: "var(--color-chart-4)",
    label: "Target",
    name: "target",
    yAxisId: "right-axis",
  },
] satisfies CompleteChartSeries[];

export const lineCampaignVsTargetData = [
  { campaignReach: 48_300, targetReach: 50_000, week: "W1" },
  { campaignReach: 52_600, targetReach: 53_000, week: "W2" },
  { campaignReach: 56_200, targetReach: 56_000, week: "W3" },
  { campaignReach: 55_500, targetReach: 59_000, week: "W4" },
  { campaignReach: 63_800, targetReach: 62_000, week: "W5" },
  { campaignReach: 67_900, targetReach: 65_000, week: "W6" },
  { campaignReach: 69_200, targetReach: 68_000, week: "W7" },
  { campaignReach: 72_800, targetReach: 71_000, week: "W8" },
];

export const lineCampaignVsTargetSeries = [
  {
    color: "var(--color-chart-1)",
    label: "Campaign Reach",
    name: "campaignReach",
  },
  {
    color: "var(--color-chart-3)",
    label: "Target Reach",
    name: "targetReach",
    strokeDasharray: "6 4",
  },
] satisfies CompleteChartSeries[];

export const lineKpiDualAxisData = [
  { activeUsers: 24_100, month: "Jan", nps: 39 },
  { activeUsers: 25_800, month: "Feb", nps: 41 },
  { activeUsers: 27_600, month: "Mar", nps: 43 },
  { activeUsers: 28_900, month: "Apr", nps: 45 },
  { activeUsers: 30_700, month: "May", nps: 44 },
  { activeUsers: 32_100, month: "Jun", nps: 46 },
];

export const lineKpiDualAxisSeries = [
  {
    color: "var(--color-chart-2)",
    label: "Active Users",
    name: "activeUsers",
    yAxisId: "left-axis",
  },
  {
    color: "var(--color-chart-5)",
    label: "NPS",
    name: "nps",
    yAxisId: "right-axis",
  },
] satisfies CompleteChartSeries[];

export const lineForecastGapsData = [
  { actualRevenue: 128_000, forecastRevenue: 130_000, month: "Jan" },
  { actualRevenue: 133_500, forecastRevenue: 136_000, month: "Feb" },
  { actualRevenue: null, forecastRevenue: 141_000, month: "Mar" },
  { actualRevenue: 145_300, forecastRevenue: 146_000, month: "Apr" },
  { actualRevenue: null, forecastRevenue: 151_500, month: "May" },
  { actualRevenue: 157_400, forecastRevenue: 156_000, month: "Jun" },
];

export const lineForecastGapsSeries = [
  {
    color: "var(--color-chart-1)",
    label: "Actual Revenue",
    name: "actualRevenue",
  },
  {
    color: "var(--color-chart-4)",
    label: "Forecast Revenue",
    name: "forecastRevenue",
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
  { color: "var(--color-chart-2)", label: "Velocity", name: "velocity" },
] satisfies CompleteChartSeries[];

export const lineSmallContainerData = [
  { activations: 27, day: "Mon", signups: 38 },
  { activations: 29, day: "Tue", signups: 42 },
  { activations: 31, day: "Wed", signups: 40 },
  { activations: 35, day: "Thu", signups: 51 },
  { activations: 39, day: "Fri", signups: 57 },
  { activations: 34, day: "Sat", signups: 49 },
  { activations: 30, day: "Sun", signups: 44 },
];

export const lineSmallContainerSeries = [
  { color: "var(--color-chart-1)", label: "Signups", name: "signups" },
  {
    color: "var(--color-chart-3)",
    label: "Activations",
    name: "activations",
  },
] satisfies CompleteChartSeries[];
