import type { Meta, StoryObj } from "@storybook/react";

import {
  completeChartShellClassName,
  formatCurrencyCompact,
  formatPercent,
} from "../stories/complete-chart-story-shared";
import { CompositeChart } from "./composite-chart";
import {
  compositeDefaultData,
  compositeDefaultSeries,
} from "./composite-chart-story-data";

const formatCompositeValue = (value: number, seriesKey: string) =>
  seriesKey === "conversionRate"
    ? formatPercent(value)
    : formatCurrencyCompact(value);

const CompositeChartCompleteDefaultDemo = () => (
  <div className={completeChartShellClassName}>
    <CompositeChart
      chartRootProps={{ className: "h-80 w-full" }}
      data={compositeDefaultData}
      dataKey="month"
      rightYAxisProps={{ width: 56, yAxisId: "conversion-axis" }}
      series={compositeDefaultSeries}
      tooltipProps={{ axisId: "revenue-axis" }}
      valueFormatter={formatCompositeValue}
      withLegend
      withRightYAxis
      yAxisProps={{ width: 64, yAxisId: "revenue-axis" }}
    />
  </div>
);

export default {
  title: "Components/Chart Complete/Composite/Default",
  component: CompositeChart,
  tags: ["autodocs"],
} satisfies Meta<typeof CompositeChart>;

type Story = StoryObj<typeof CompositeChart>;

export const CompositeChartCompleteDefault: Story = {
  args: {
    data: compositeDefaultData,
    dataKey: "month",
    series: compositeDefaultSeries,
  },
  render: () => <CompositeChartCompleteDefaultDemo />,
};
