import type { Meta, StoryObj } from "@storybook/react";

import { completeChartShellVariants } from "../stories/complete-chart-story-shared";
import { BubbleChart } from "./bubble-chart";
import { bubbleRangeSeries } from "./bubble-chart-story-data";

const BubbleChartCompleteRangeSizingDemo = () => (
  <div className={completeChartShellVariants()}>
    <BubbleChart
      bubbleRange={[40, 480]}
      chartRootProps={{ className: "h-80 w-full" }}
      series={bubbleRangeSeries}
      withLegend
      xKey="scoreX"
      yKey="scoreY"
      zKey="dealSize"
    />
  </div>
);

export default {
  title: "Components/Chart Complete/Bubble/RangeSizing",
  component: BubbleChart,
  tags: ["autodocs"],
} satisfies Meta<typeof BubbleChart>;

type Story = StoryObj<typeof BubbleChart>;

export const BubbleChartCompleteRangeSizing: Story = {
  args: {
    series: bubbleRangeSeries,
    xKey: "scoreX",
    yKey: "scoreY",
    zKey: "dealSize",
  },
  render: () => <BubbleChartCompleteRangeSizingDemo />,
};
