import type { Meta, StoryObj } from "@storybook/react";

import {
  completeChartShellClassName,
  formatNumberCompact,
} from "../stories/complete-chart-story-shared";
import { BubbleChart } from "./bubble-chart";
import { bubbleDefaultSeries } from "./bubble-chart-story-data";

const formatSatisfaction = (value: number) => `${value}%`;
const formatVelocity = (value: number) => `${value.toFixed(1)} pts`;
const formatVolume = (value: number) => `${formatNumberCompact(value)} accts`;

const BubbleChartCompleteZTooltipFormatterDemo = () => (
  <div className={completeChartShellClassName}>
    <BubbleChart
      chartRootProps={{ className: "h-80 w-full" }}
      series={bubbleDefaultSeries}
      tooltipProps={{ defaultIndex: 2, trigger: "click" }}
      withLegend
      xKey="satisfaction"
      xValueFormatter={formatSatisfaction}
      yKey="velocity"
      yValueFormatter={formatVelocity}
      zKey="volume"
      zValueFormatter={formatVolume}
    />
  </div>
);

export default {
  title: "Components/Chart Complete/Bubble/ZTooltipFormatter",
  component: BubbleChart,
  tags: ["autodocs"],
} satisfies Meta<typeof BubbleChart>;

type Story = StoryObj<typeof BubbleChart>;

export const BubbleChartCompleteZTooltipFormatter: Story = {
  args: {
    series: bubbleDefaultSeries,
    xKey: "satisfaction",
    yKey: "velocity",
    zKey: "volume",
  },
  render: () => <BubbleChartCompleteZTooltipFormatterDemo />,
};
