import type { Meta, StoryObj } from "@storybook/react";

import {
  completeChartShellVariants,
  formatCurrencyCompact,
} from "../stories/complete-chart-story-shared";
import { LineChart } from "./line-chart";

const gradientCurveData = [
  { baseline: 148_000, booked: 156_500, month: "Jan" },
  { baseline: 152_000, booked: 161_200, month: "Feb" },
  { baseline: 157_000, booked: 167_400, month: "Mar" },
  { baseline: 160_500, booked: 172_000, month: "Apr" },
  { baseline: 163_000, booked: 175_300, month: "May" },
  { baseline: 165_000, booked: 179_600, month: "Jun" },
];

const gradientCurveSeries = [
  {
    curveType: "stepAfter" as const,
    label: "Baseline",
    name: "baseline",
  },
  {
    curveType: "natural" as const,
    label: "Booked",
    name: "booked",
  },
];

const formatRevenue = (value: number) => formatCurrencyCompact(value);

const LineChartCompleteGradientCurvePointsDemo = () => (
  <div className={completeChartShellVariants()}>
    <LineChart
      activeDotProps={{ r: 6 }}
      chartRootProps={{ className: "h-80 w-full" }}
      data={gradientCurveData}
      dataKey="month"
      dotProps={{ r: 4, strokeWidth: 1 }}
      gradientStops={[
        { color: "var(--color-chart-5)", offset: 0 },
        { color: "var(--color-chart-2)", offset: 50 },
        { color: "var(--color-chart-1)", offset: 100 },
      ]}
      lineChartProps={{ margin: { bottom: 0, left: 0, right: 8, top: 8 } }}
      series={gradientCurveSeries}
      type="gradient"
      valueFormatter={formatRevenue}
      withDots
      withLegend
      withPointLabels
    />
  </div>
);

export default {
  component: LineChart,
  tags: ["autodocs"],
  title: "Components/Chart Complete/Line/GradientCurvePoints",
} satisfies Meta<typeof LineChart>;

type Story = StoryObj<typeof LineChart>;

export const LineChartCompleteGradientCurvePoints: Story = {
  args: {
    data: gradientCurveData,
    dataKey: "month",
    series: gradientCurveSeries,
  },
  render: () => <LineChartCompleteGradientCurvePointsDemo />,
};
