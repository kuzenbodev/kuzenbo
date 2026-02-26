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
      composedChartProps={{ margin: { top: 8, right: 4, left: -8, bottom: 0 } }}
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
  title: "Components/Chart Complete/Composite/SmallContainerNoOverlays",
  component: CompositeChart,
  tags: ["autodocs"],
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
