import type { Meta, StoryObj } from "@storybook/react";

import {
  completeChartShellClassName,
  formatCurrencyCompact,
} from "../stories/complete-chart-story-shared";
import { LineChart } from "./line-chart";

const gradientCurveData = [
  { month: "Jan", baseline: 148_000, booked: 156_500 },
  { month: "Feb", baseline: 152_000, booked: 161_200 },
  { month: "Mar", baseline: 157_000, booked: 167_400 },
  { month: "Apr", baseline: 160_500, booked: 172_000 },
  { month: "May", baseline: 163_000, booked: 175_300 },
  { month: "Jun", baseline: 165_000, booked: 179_600 },
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
  <div className={completeChartShellClassName}>
    <LineChart
      activeDotProps={{ r: 6 }}
      chartRootProps={{ className: "h-80 w-full" }}
      data={gradientCurveData}
      dataKey="month"
      dotProps={{ r: 4, strokeWidth: 1 }}
      gradientStops={[
        { offset: 0, color: "var(--color-chart-5)" },
        { offset: 50, color: "var(--color-chart-2)" },
        { offset: 100, color: "var(--color-chart-1)" },
      ]}
      lineChartProps={{ margin: { top: 8, right: 8, left: 0, bottom: 0 } }}
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
  title: "Components/Chart Complete/Line/GradientCurvePoints",
  component: LineChart,
  tags: ["autodocs"],
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
