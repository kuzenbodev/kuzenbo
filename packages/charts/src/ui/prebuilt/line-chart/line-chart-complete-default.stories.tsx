import type { Meta, StoryObj } from "@storybook/react";

import {
  completeChartShellVariants,
  formatCurrencyCompact,
} from "../stories/complete-chart-story-shared";
import { LineChart } from "./line-chart";
import { lineDefaultData, lineDefaultSeries } from "./line-chart-story-data";

const formatLineValue = (value: number) => formatCurrencyCompact(value);

const LineChartCompleteDefaultDemo = () => (
  <div className={completeChartShellVariants()}>
    <LineChart
      chartRootProps={{ className: "h-80 w-full" }}
      data={lineDefaultData}
      dataKey="month"
      referenceLines={[
        {
          color: "var(--color-target)",
          label: "Target",
          strokeDasharray: "4 4",
          y: 235_000,
        },
      ]}
      series={lineDefaultSeries}
      tooltipProps={{ cursor: false, defaultIndex: 4, trigger: "click" }}
      valueFormatter={formatLineValue}
      withLegend
      withRightYAxis
      yAxisProps={{ width: 64 }}
      rightYAxisProps={{ width: 64, yAxisId: "right-axis" }}
    />
  </div>
);

export default {
  component: LineChart,
  tags: ["autodocs"],
  title: "Components/Chart Complete/Line/Default",
} satisfies Meta<typeof LineChart>;

type Story = StoryObj<typeof LineChart>;

export const LineChartCompleteDefault: Story = {
  args: {
    data: lineDefaultData,
    dataKey: "month",
    series: lineDefaultSeries,
  },
  render: () => <LineChartCompleteDefaultDemo />,
};
