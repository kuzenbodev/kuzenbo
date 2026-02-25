import type { Meta, StoryObj } from "@storybook/react";

import {
  completeChartShellClassName,
  formatCurrencyCompact,
} from "../stories/complete-chart-story-shared";
import { LineChart } from "./line-chart";
import { lineDefaultData, lineDefaultSeries } from "./line-chart-story-data";

const formatLineValue = (value: number) => formatCurrencyCompact(value);

const LineChartCompleteDefaultDemo = () => (
  <div className={completeChartShellClassName}>
    <LineChart
      chartRootProps={{ className: "h-80 w-full" }}
      data={lineDefaultData}
      dataKey="month"
      referenceLines={[
        {
          y: 235_000,
          color: "var(--color-target)",
          strokeDasharray: "4 4",
          label: "Target",
        },
      ]}
      series={lineDefaultSeries}
      tooltipProps={{ cursor: false, defaultIndex: 4, trigger: "click" }}
      valueFormatter={formatLineValue}
      withLegend
      withRightYAxis
      yAxisProps={{ width: 64 }}
      rightYAxisProps={{ yAxisId: "right-axis", width: 64 }}
    />
  </div>
);

export default {
  title: "Components/Chart Complete/Line/Default",
  component: LineChart,
  tags: ["autodocs"],
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
