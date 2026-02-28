import type { Meta, StoryObj } from "@storybook/react";

import { completeChartShellVariants } from "../stories/complete-chart-story-shared";
import { LineChart } from "./line-chart";
import { lineMinimalData, lineMinimalSeries } from "./line-chart-story-data";

const LineChartCompleteMinimalNoLegendTooltipDemo = () => (
  <div className={completeChartShellVariants()}>
    <LineChart
      lineChartProps={{ margin: { bottom: 0, left: 0, right: 8, top: 8 } }}
      chartRootProps={{ className: "h-72 w-full" }}
      curveType="linear"
      data={lineMinimalData}
      dataKey="month"
      gridAxis="none"
      series={lineMinimalSeries}
      tickLine="none"
      withDots={false}
      withLegend={false}
      withTooltip={false}
      yAxisProps={{ width: 44 }}
    />
  </div>
);

export default {
  component: LineChart,
  tags: ["autodocs"],
  title: "Components/Chart Complete/Line/MinimalNoLegendTooltip",
} satisfies Meta<typeof LineChart>;

type Story = StoryObj<typeof LineChart>;

export const LineChartCompleteMinimalNoLegendTooltip: Story = {
  args: {
    data: lineMinimalData,
    dataKey: "month",
    series: lineMinimalSeries,
  },
  render: () => <LineChartCompleteMinimalNoLegendTooltipDemo />,
};
