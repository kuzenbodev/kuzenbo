import type { CompleteChartSeries } from "../shared/complete-types";

export const barDefaultData = [
  { month: "Jan", organic: 310, paid: 180, partners: 95 },
  { month: "Feb", organic: 340, paid: 196, partners: 104 },
  { month: "Mar", organic: 365, paid: 205, partners: 116 },
  { month: "Apr", organic: 382, paid: 222, partners: 120 },
  { month: "May", organic: 401, paid: 238, partners: 131 },
  { month: "Jun", organic: 425, paid: 246, partners: 140 },
];

export const barDefaultSeries = [
  {
    color: "var(--color-chart-1)",
    label: "Organic",
    name: "organic",
    stackId: "acquisition",
  },
  {
    color: "var(--color-chart-2)",
    label: "Paid",
    name: "paid",
    stackId: "acquisition",
  },
  {
    color: "var(--color-chart-3)",
    label: "Partners",
    name: "partners",
    stackId: "acquisition",
  },
] satisfies CompleteChartSeries[];

export const barGroupedChannelsData = [
  { partner: 290, quarter: "Q1", sales: 610, web: 860 },
  { partner: 328, quarter: "Q2", sales: 635, web: 910 },
  { partner: 357, quarter: "Q3", sales: 688, web: 960 },
  { partner: 390, quarter: "Q4", sales: 740, web: 1030 },
];

export const barGroupedChannelsSeries = [
  { color: "var(--color-chart-1)", label: "Web", name: "web" },
  { color: "var(--color-chart-4)", label: "Sales", name: "sales" },
  { color: "var(--color-chart-5)", label: "Partner", name: "partner" },
] satisfies CompleteChartSeries[];

export const barHorizontalRegionalData = [
  { enterprise: 420, region: "North America", smb: 580 },
  { enterprise: 360, region: "Europe", smb: 490 },
  { enterprise: 330, region: "APAC", smb: 470 },
  { enterprise: 220, region: "LATAM", smb: 350 },
];

export const barHorizontalRegionalSeries = [
  { color: "var(--color-chart-2)", label: "SMB", name: "smb" },
  { color: "var(--color-chart-1)", label: "Enterprise", name: "enterprise" },
] satisfies CompleteChartSeries[];

export const barNetFlowNegativeData = [
  { inflow: 42, month: "Jan", outflow: -18 },
  { inflow: 39, month: "Feb", outflow: -21 },
  { inflow: 45, month: "Mar", outflow: -23 },
  { inflow: 47, month: "Apr", outflow: -28 },
  { inflow: 50, month: "May", outflow: -31 },
  { inflow: 54, month: "Jun", outflow: -34 },
];

export const barNetFlowNegativeSeries = [
  { color: "var(--color-chart-1)", label: "Inflow", name: "inflow" },
  { color: "var(--color-chart-5)", label: "Outflow", name: "outflow" },
] satisfies CompleteChartSeries[];

export const barDualAxisGoalsData = [
  { leads: 840, month: "Jan", spend: 41_000 },
  { leads: 900, month: "Feb", spend: 44_500 },
  { leads: 958, month: "Mar", spend: 47_800 },
  { leads: 1006, month: "Apr", spend: 49_200 },
  { leads: 1080, month: "May", spend: 53_400 },
  { leads: 1120, month: "Jun", spend: 55_000 },
];

export const barDualAxisGoalsSeries = [
  {
    color: "var(--color-chart-3)",
    label: "Spend",
    name: "spend",
    yAxisId: "left-axis",
  },
  {
    color: "var(--color-chart-1)",
    label: "Leads",
    name: "leads",
    yAxisId: "right-axis",
  },
] satisfies CompleteChartSeries[];

export const barDenseCategoriesData = [
  { channel: "SEO", pipeline: 182 },
  { channel: "Paid Search", pipeline: 204 },
  { channel: "Partnerships", pipeline: 155 },
  { channel: "Webinars", pipeline: 129 },
  { channel: "Outbound", pipeline: 166 },
  { channel: "Affiliates", pipeline: 143 },
  { channel: "Influencers", pipeline: 121 },
  { channel: "Product-Led", pipeline: 198 },
  { channel: "Referrals", pipeline: 117 },
  { channel: "Community", pipeline: 106 },
  { channel: "Events", pipeline: 94 },
  { channel: "Marketplace", pipeline: 112 },
];

export const barDenseCategoriesSeries = [
  { color: "var(--color-chart-2)", label: "Pipeline", name: "pipeline" },
] satisfies CompleteChartSeries[];
