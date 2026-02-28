import type { Meta, StoryObj } from "@storybook/react";

import { completeChartCompactShellVariants } from "../stories/complete-chart-story-shared";
import { LineChart } from "./line-chart";
import {
  lineSmallContainerData,
  lineSmallContainerSeries,
} from "./line-chart-story-data";

const LineChartCompleteSmallContainerDemo = () => (
  <div className={completeChartCompactShellVariants()}>
    <LineChart
      lineChartProps={{
        margin: { bottom: 0, left: -4, right: 4, top: 8 },
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
  component: LineChart,
  tags: ["autodocs"],
  title: "Components/Chart Complete/Line/SmallContainer",
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
