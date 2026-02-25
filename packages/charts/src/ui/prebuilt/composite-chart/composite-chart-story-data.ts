import type { CompleteCompositeSeries } from "../shared/complete-types";

export const compositeDefaultData = [
  { month: "Jan", revenue: 91_000, conversionRate: 12.4, pipeline: 143_000 },
  { month: "Feb", revenue: 97_600, conversionRate: 12.9, pipeline: 149_000 },
  { month: "Mar", revenue: 104_500, conversionRate: 13.5, pipeline: 158_000 },
  { month: "Apr", revenue: 111_200, conversionRate: 14.1, pipeline: 169_000 },
  { month: "May", revenue: 118_900, conversionRate: 14.6, pipeline: 178_500 },
  { month: "Jun", revenue: 126_700, conversionRate: 15, pipeline: 191_000 },
];

export const compositeDefaultSeries = [
  {
    name: "revenue",
    label: "Revenue",
    type: "bar",
    color: "var(--color-chart-1)",
    yAxisId: "revenue-axis",
  },
  {
    name: "conversionRate",
    label: "Conversion",
    type: "line",
    color: "var(--color-chart-3)",
    yAxisId: "conversion-axis",
  },
  {
    name: "pipeline",
    label: "Pipeline",
    type: "area",
    color: "var(--color-chart-2)",
    yAxisId: "revenue-axis",
  },
] satisfies CompleteCompositeSeries[];

export const compositeFunnelBlendData = [
  { stage: "Visit", leads: 5200, conversion: 100, forecast: 5400 },
  { stage: "Signup", leads: 1880, conversion: 36.2, forecast: 2020 },
  { stage: "Activated", leads: 980, conversion: 18.8, forecast: 1040 },
  { stage: "Qualified", leads: 520, conversion: 10, forecast: 560 },
  { stage: "Won", leads: 230, conversion: 4.4, forecast: 260 },
];

export const compositeFunnelBlendSeries = [
  {
    name: "leads",
    label: "Leads",
    type: "bar",
    color: "var(--color-chart-1)",
    yAxisId: "volume-axis",
  },
  {
    name: "forecast",
    label: "Forecast",
    type: "area",
    color: "var(--color-chart-2)",
    yAxisId: "volume-axis",
  },
  {
    name: "conversion",
    label: "Conversion %",
    type: "line",
    color: "var(--color-chart-5)",
    yAxisId: "conversion-axis",
  },
] satisfies CompleteCompositeSeries[];

export const compositeOpsMixData = [
  { month: "Jan", support: 132, oncall: 78, incidents: 92, cogs: 76_000 },
  { month: "Feb", support: 128, oncall: 77, incidents: 88, cogs: 73_500 },
  { month: "Mar", support: 141, oncall: 85, incidents: 95, cogs: 78_000 },
  { month: "Apr", support: 146, oncall: 88, incidents: 101, cogs: 80_500 },
  { month: "May", support: 152, oncall: 90, incidents: 99, cogs: 82_400 },
  { month: "Jun", support: 158, oncall: 93, incidents: 106, cogs: 85_200 },
];

export const compositeOpsMixSeries = [
  {
    name: "support",
    label: "Support Hours",
    type: "bar",
    color: "var(--color-chart-3)",
    stackId: "operations-load",
    yAxisId: "hours-axis",
  },
  {
    name: "oncall",
    label: "On-Call Hours",
    type: "bar",
    color: "var(--color-chart-1)",
    stackId: "operations-load",
    yAxisId: "hours-axis",
  },
  {
    name: "incidents",
    label: "Incidents",
    type: "line",
    color: "var(--color-chart-5)",
    yAxisId: "hours-axis",
  },
  {
    name: "cogs",
    label: "COGS",
    type: "area",
    color: "var(--color-chart-2)",
    yAxisId: "cost-axis",
  },
] satisfies CompleteCompositeSeries[];

export const compositeLabelHeavyData = [
  { week: "W1", meetings: 124, demos: 71, winRate: 21.6 },
  { week: "W2", meetings: 130, demos: 77, winRate: 22.1 },
  { week: "W3", meetings: 138, demos: 82, winRate: 22.8 },
  { week: "W4", meetings: 142, demos: 85, winRate: 23.2 },
  { week: "W5", meetings: 149, demos: 91, winRate: 24.3 },
  { week: "W6", meetings: 153, demos: 96, winRate: 24.8 },
];

export const compositeLabelHeavySeries = [
  {
    name: "meetings",
    label: "Meetings",
    type: "bar",
    color: "var(--color-chart-1)",
    yAxisId: "volume-axis",
  },
  {
    name: "demos",
    label: "Demos",
    type: "area",
    color: "var(--color-chart-2)",
    yAxisId: "volume-axis",
  },
  {
    name: "winRate",
    label: "Win Rate",
    type: "line",
    color: "var(--color-chart-4)",
    yAxisId: "rate-axis",
  },
] satisfies CompleteCompositeSeries[];

export const compositeNullsAndZeroesData = [
  { month: "Jan", revenue: 84_000, conversionRate: 11.7, pipeline: 130_000 },
  { month: "Feb", revenue: 0, conversionRate: 0, pipeline: 0 },
  { month: "Mar", revenue: 92_500, conversionRate: null, pipeline: 141_000 },
  { month: "Apr", revenue: 95_100, conversionRate: 12.8, pipeline: null },
  { month: "May", revenue: 0, conversionRate: 0, pipeline: 144_200 },
  { month: "Jun", revenue: 103_400, conversionRate: 13.5, pipeline: 151_600 },
];

export const compositeNullsAndZeroesSeries = [
  {
    name: "revenue",
    label: "Revenue",
    type: "bar",
    color: "var(--color-chart-1)",
    yAxisId: "revenue-axis",
  },
  {
    name: "pipeline",
    label: "Pipeline",
    type: "area",
    color: "var(--color-chart-2)",
    yAxisId: "revenue-axis",
  },
  {
    name: "conversionRate",
    label: "Conversion",
    type: "line",
    color: "var(--color-chart-5)",
    yAxisId: "conversion-axis",
  },
] satisfies CompleteCompositeSeries[];

export const compositeSmallContainerData = [
  { day: "Mon", revenue: 13_000, conversionRate: 9.8, pipeline: 19_200 },
  { day: "Tue", revenue: 14_600, conversionRate: 10.4, pipeline: 20_100 },
  { day: "Wed", revenue: 12_900, conversionRate: 9.7, pipeline: 18_900 },
  { day: "Thu", revenue: 15_100, conversionRate: 10.8, pipeline: 21_200 },
  { day: "Fri", revenue: 16_000, conversionRate: 11.1, pipeline: 22_000 },
];

export const compositeSmallContainerSeries = [
  {
    name: "revenue",
    label: "Revenue",
    type: "bar",
    color: "var(--color-chart-1)",
    yAxisId: "revenue-axis",
  },
  {
    name: "pipeline",
    label: "Pipeline",
    type: "area",
    color: "var(--color-chart-3)",
    yAxisId: "revenue-axis",
  },
  {
    name: "conversionRate",
    label: "Conversion",
    type: "line",
    color: "var(--color-chart-4)",
    yAxisId: "conversion-axis",
  },
] satisfies CompleteCompositeSeries[];
