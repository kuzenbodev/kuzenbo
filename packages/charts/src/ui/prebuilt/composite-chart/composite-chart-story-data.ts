import type { CompleteCompositeSeries } from "../shared/complete-types";

export const compositeDefaultData = [
  { conversionRate: 12.4, month: "Jan", pipeline: 143_000, revenue: 91_000 },
  { conversionRate: 12.9, month: "Feb", pipeline: 149_000, revenue: 97_600 },
  { conversionRate: 13.5, month: "Mar", pipeline: 158_000, revenue: 104_500 },
  { conversionRate: 14.1, month: "Apr", pipeline: 169_000, revenue: 111_200 },
  { conversionRate: 14.6, month: "May", pipeline: 178_500, revenue: 118_900 },
  { conversionRate: 15, month: "Jun", pipeline: 191_000, revenue: 126_700 },
];

export const compositeDefaultSeries = [
  {
    color: "var(--color-chart-1)",
    label: "Revenue",
    name: "revenue",
    type: "bar",
    yAxisId: "revenue-axis",
  },
  {
    color: "var(--color-chart-3)",
    label: "Conversion",
    name: "conversionRate",
    type: "line",
    yAxisId: "conversion-axis",
  },
  {
    color: "var(--color-chart-2)",
    label: "Pipeline",
    name: "pipeline",
    type: "area",
    yAxisId: "revenue-axis",
  },
] satisfies CompleteCompositeSeries[];

export const compositeFunnelBlendData = [
  { conversion: 100, forecast: 5400, leads: 5200, stage: "Visit" },
  { conversion: 36.2, forecast: 2020, leads: 1880, stage: "Signup" },
  { conversion: 18.8, forecast: 1040, leads: 980, stage: "Activated" },
  { conversion: 10, forecast: 560, leads: 520, stage: "Qualified" },
  { conversion: 4.4, forecast: 260, leads: 230, stage: "Won" },
];

export const compositeFunnelBlendSeries = [
  {
    color: "var(--color-chart-1)",
    label: "Leads",
    name: "leads",
    type: "bar",
    yAxisId: "volume-axis",
  },
  {
    color: "var(--color-chart-2)",
    label: "Forecast",
    name: "forecast",
    type: "area",
    yAxisId: "volume-axis",
  },
  {
    color: "var(--color-chart-5)",
    label: "Conversion %",
    name: "conversion",
    type: "line",
    yAxisId: "conversion-axis",
  },
] satisfies CompleteCompositeSeries[];

export const compositeOpsMixData = [
  { cogs: 76_000, incidents: 92, month: "Jan", oncall: 78, support: 132 },
  { cogs: 73_500, incidents: 88, month: "Feb", oncall: 77, support: 128 },
  { cogs: 78_000, incidents: 95, month: "Mar", oncall: 85, support: 141 },
  { cogs: 80_500, incidents: 101, month: "Apr", oncall: 88, support: 146 },
  { cogs: 82_400, incidents: 99, month: "May", oncall: 90, support: 152 },
  { cogs: 85_200, incidents: 106, month: "Jun", oncall: 93, support: 158 },
];

export const compositeOpsMixSeries = [
  {
    color: "var(--color-chart-3)",
    label: "Support Hours",
    name: "support",
    stackId: "operations-load",
    type: "bar",
    yAxisId: "hours-axis",
  },
  {
    color: "var(--color-chart-1)",
    label: "On-Call Hours",
    name: "oncall",
    stackId: "operations-load",
    type: "bar",
    yAxisId: "hours-axis",
  },
  {
    color: "var(--color-chart-5)",
    label: "Incidents",
    name: "incidents",
    type: "line",
    yAxisId: "hours-axis",
  },
  {
    color: "var(--color-chart-2)",
    label: "COGS",
    name: "cogs",
    type: "area",
    yAxisId: "cost-axis",
  },
] satisfies CompleteCompositeSeries[];

export const compositeLabelHeavyData = [
  { demos: 71, meetings: 124, week: "W1", winRate: 21.6 },
  { demos: 77, meetings: 130, week: "W2", winRate: 22.1 },
  { demos: 82, meetings: 138, week: "W3", winRate: 22.8 },
  { demos: 85, meetings: 142, week: "W4", winRate: 23.2 },
  { demos: 91, meetings: 149, week: "W5", winRate: 24.3 },
  { demos: 96, meetings: 153, week: "W6", winRate: 24.8 },
];

export const compositeLabelHeavySeries = [
  {
    color: "var(--color-chart-1)",
    label: "Meetings",
    name: "meetings",
    type: "bar",
    yAxisId: "volume-axis",
  },
  {
    color: "var(--color-chart-2)",
    label: "Demos",
    name: "demos",
    type: "area",
    yAxisId: "volume-axis",
  },
  {
    color: "var(--color-chart-4)",
    label: "Win Rate",
    name: "winRate",
    type: "line",
    yAxisId: "rate-axis",
  },
] satisfies CompleteCompositeSeries[];

export const compositeNullsAndZeroesData = [
  { conversionRate: 11.7, month: "Jan", pipeline: 130_000, revenue: 84_000 },
  { conversionRate: 0, month: "Feb", pipeline: 0, revenue: 0 },
  { conversionRate: null, month: "Mar", pipeline: 141_000, revenue: 92_500 },
  { conversionRate: 12.8, month: "Apr", pipeline: null, revenue: 95_100 },
  { conversionRate: 0, month: "May", pipeline: 144_200, revenue: 0 },
  { conversionRate: 13.5, month: "Jun", pipeline: 151_600, revenue: 103_400 },
];

export const compositeNullsAndZeroesSeries = [
  {
    color: "var(--color-chart-1)",
    label: "Revenue",
    name: "revenue",
    type: "bar",
    yAxisId: "revenue-axis",
  },
  {
    color: "var(--color-chart-2)",
    label: "Pipeline",
    name: "pipeline",
    type: "area",
    yAxisId: "revenue-axis",
  },
  {
    color: "var(--color-chart-5)",
    label: "Conversion",
    name: "conversionRate",
    type: "line",
    yAxisId: "conversion-axis",
  },
] satisfies CompleteCompositeSeries[];

export const compositeSmallContainerData = [
  { conversionRate: 9.8, day: "Mon", pipeline: 19_200, revenue: 13_000 },
  { conversionRate: 10.4, day: "Tue", pipeline: 20_100, revenue: 14_600 },
  { conversionRate: 9.7, day: "Wed", pipeline: 18_900, revenue: 12_900 },
  { conversionRate: 10.8, day: "Thu", pipeline: 21_200, revenue: 15_100 },
  { conversionRate: 11.1, day: "Fri", pipeline: 22_000, revenue: 16_000 },
];

export const compositeSmallContainerSeries = [
  {
    color: "var(--color-chart-1)",
    label: "Revenue",
    name: "revenue",
    type: "bar",
    yAxisId: "revenue-axis",
  },
  {
    color: "var(--color-chart-3)",
    label: "Pipeline",
    name: "pipeline",
    type: "area",
    yAxisId: "revenue-axis",
  },
  {
    color: "var(--color-chart-4)",
    label: "Conversion",
    name: "conversionRate",
    type: "line",
    yAxisId: "conversion-axis",
  },
] satisfies CompleteCompositeSeries[];
