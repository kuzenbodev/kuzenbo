import type { Meta, StoryObj } from "@storybook/react";

import { completeChartShellVariants } from "../stories/complete-chart-story-shared";
import { LineChart } from "./line-chart";
import { lineMinimalData, lineMinimalSeries } from "./line-chart-story-data";

const LineChartCompleteMinimalNoLegendTooltipDemo = () => (
  <div className={completeChartShellVariants()}>
    <LineChart
      lineChartProps={{ margin: { top: 8, right: 8, left: 0, bottom: 0 } }}
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
  title: "Components/Chart Complete/Line/MinimalNoLegendTooltip",
  component: LineChart,
  tags: ["autodocs"],
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
