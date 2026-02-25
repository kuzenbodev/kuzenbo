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
    name: "organic",
    label: "Organic",
    color: "var(--color-chart-1)",
    stackId: "acquisition",
  },
  {
    name: "paid",
    label: "Paid",
    color: "var(--color-chart-2)",
    stackId: "acquisition",
  },
  {
    name: "partners",
    label: "Partners",
    color: "var(--color-chart-3)",
    stackId: "acquisition",
  },
] satisfies CompleteChartSeries[];

export const barGroupedChannelsData = [
  { quarter: "Q1", web: 860, sales: 610, partner: 290 },
  { quarter: "Q2", web: 910, sales: 635, partner: 328 },
  { quarter: "Q3", web: 960, sales: 688, partner: 357 },
  { quarter: "Q4", web: 1030, sales: 740, partner: 390 },
];

export const barGroupedChannelsSeries = [
  { name: "web", label: "Web", color: "var(--color-chart-1)" },
  { name: "sales", label: "Sales", color: "var(--color-chart-4)" },
  { name: "partner", label: "Partner", color: "var(--color-chart-5)" },
] satisfies CompleteChartSeries[];

export const barHorizontalRegionalData = [
  { region: "North America", smb: 580, enterprise: 420 },
  { region: "Europe", smb: 490, enterprise: 360 },
  { region: "APAC", smb: 470, enterprise: 330 },
  { region: "LATAM", smb: 350, enterprise: 220 },
];

export const barHorizontalRegionalSeries = [
  { name: "smb", label: "SMB", color: "var(--color-chart-2)" },
  { name: "enterprise", label: "Enterprise", color: "var(--color-chart-1)" },
] satisfies CompleteChartSeries[];

export const barNetFlowNegativeData = [
  { month: "Jan", inflow: 42, outflow: -18 },
  { month: "Feb", inflow: 39, outflow: -21 },
  { month: "Mar", inflow: 45, outflow: -23 },
  { month: "Apr", inflow: 47, outflow: -28 },
  { month: "May", inflow: 50, outflow: -31 },
  { month: "Jun", inflow: 54, outflow: -34 },
];

export const barNetFlowNegativeSeries = [
  { name: "inflow", label: "Inflow", color: "var(--color-chart-1)" },
  { name: "outflow", label: "Outflow", color: "var(--color-chart-5)" },
] satisfies CompleteChartSeries[];

export const barDualAxisGoalsData = [
  { month: "Jan", spend: 41_000, leads: 840 },
  { month: "Feb", spend: 44_500, leads: 900 },
  { month: "Mar", spend: 47_800, leads: 958 },
  { month: "Apr", spend: 49_200, leads: 1006 },
  { month: "May", spend: 53_400, leads: 1080 },
  { month: "Jun", spend: 55_000, leads: 1120 },
];

export const barDualAxisGoalsSeries = [
  {
    name: "spend",
    label: "Spend",
    color: "var(--color-chart-3)",
    yAxisId: "left-axis",
  },
  {
    name: "leads",
    label: "Leads",
    color: "var(--color-chart-1)",
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
  { name: "pipeline", label: "Pipeline", color: "var(--color-chart-2)" },
] satisfies CompleteChartSeries[];
