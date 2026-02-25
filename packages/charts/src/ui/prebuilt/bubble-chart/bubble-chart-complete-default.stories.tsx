import type { Meta, StoryObj } from "@storybook/react";

import { completeChartShellClassName } from "../stories/complete-chart-story-shared";
import { BubbleChart } from "./bubble-chart";
import { bubbleDefaultSeries } from "./bubble-chart-story-data";

const BubbleChartCompleteDefaultDemo = () => (
  <div className={completeChartShellClassName}>
    <BubbleChart
      chartRootProps={{ className: "h-80 w-full" }}
      series={bubbleDefaultSeries}
      withLegend
      xAxisLabel="Satisfaction"
      xKey="satisfaction"
      yAxisLabel="Delivery Velocity"
      yKey="velocity"
      yUnit="pts"
      zKey="volume"
      zUnit="accounts"
    />
  </div>
);

export default {
  title: "Components/Chart Complete/Bubble/Default",
  component: BubbleChart,
  tags: ["autodocs"],
} satisfies Meta<typeof BubbleChart>;

type Story = StoryObj<typeof BubbleChart>;

export const BubbleChartCompleteDefault: Story = {
  args: {
    series: bubbleDefaultSeries,
    xKey: "satisfaction",
    yKey: "velocity",
    zKey: "volume",
  },
  render: () => <BubbleChartCompleteDefaultDemo />,
};
