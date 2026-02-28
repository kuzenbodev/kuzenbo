import type { Meta, StoryObj } from "@storybook/react";

import { completeChartCompactShellVariants } from "../stories/complete-chart-story-shared";
import { CompositeChart } from "./composite-chart";
import {
  compositeSmallContainerData,
  compositeSmallContainerSeries,
} from "./composite-chart-story-data";

const CompositeChartCompleteSmallContainerNoOverlaysDemo = () => (
  <div className={completeChartCompactShellVariants()}>
    <CompositeChart
      composedChartProps={{ margin: { bottom: 0, left: -8, right: 4, top: 8 } }}
      chartRootProps={{ className: "h-52 w-full" }}
      data={compositeSmallContainerData}
      dataKey="day"
      rightYAxisProps={{ width: 34, yAxisId: "conversion-axis" }}
      series={compositeSmallContainerSeries}
      withLegend={false}
      withRightYAxis
      withTooltip={false}
      xAxisProps={{ interval: 0, tickMargin: 2 }}
      yAxisProps={{ width: 34, yAxisId: "revenue-axis" }}
    />
  </div>
);

export default {
  component: CompositeChart,
  tags: ["autodocs"],
  title: "Components/Chart Complete/Composite/SmallContainerNoOverlays",
} satisfies Meta<typeof CompositeChart>;

type Story = StoryObj<typeof CompositeChart>;

export const CompositeChartCompleteSmallContainerNoOverlays: Story = {
  args: {
    data: compositeSmallContainerData,
    dataKey: "day",
    series: compositeSmallContainerSeries,
  },
  render: () => <CompositeChartCompleteSmallContainerNoOverlaysDemo />,
};
