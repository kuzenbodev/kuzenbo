import type { Meta, StoryObj } from "@storybook/react";

import { completeChartCompactShellClassName } from "../stories/complete-chart-story-shared";
import { LineChart } from "./line-chart";
import {
  lineSmallContainerData,
  lineSmallContainerSeries,
} from "./line-chart-story-data";

const LineChartCompleteSmallContainerDemo = () => (
  <div className={completeChartCompactShellClassName}>
    <LineChart
      lineChartProps={{
        margin: { top: 8, right: 4, left: -4, bottom: 0 },
      }}
      chartRootProps={{ className: "h-52 w-full" }}
      data={lineSmallContainerData}
      dataKey="day"
      series={lineSmallContainerSeries}
      tooltipProps={{ shared: false }}
      withLegend={false}
      xAxisProps={{ interval: 0, tickMargin: 2 }}
      yAxisProps={{ tickCount: 4, width: 30 }}
    />
  </div>
);

export default {
  title: "Components/Chart Complete/Line/SmallContainer",
  component: LineChart,
  tags: ["autodocs"],
} satisfies Meta<typeof LineChart>;

type Story = StoryObj<typeof LineChart>;

export const LineChartCompleteSmallContainer: Story = {
  args: {
    data: lineSmallContainerData,
    dataKey: "day",
    series: lineSmallContainerSeries,
  },
  render: () => <LineChartCompleteSmallContainerDemo />,
};
