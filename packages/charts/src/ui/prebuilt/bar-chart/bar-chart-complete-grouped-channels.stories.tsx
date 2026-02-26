import type { Meta, StoryObj } from "@storybook/react";

import {
  completeChartShellVariants,
  formatNumberCompact,
} from "../stories/complete-chart-story-shared";
import { BarChart } from "./bar-chart";
import {
  barGroupedChannelsData,
  barGroupedChannelsSeries,
} from "./bar-chart-story-data";

const formatGroupedValue = (value: number) => formatNumberCompact(value);

const BarChartCompleteGroupedChannelsDemo = () => (
  <div className={completeChartShellVariants()}>
    <BarChart
      barProps={{ strokeOpacity: 0.5, strokeWidth: 1 }}
      chartRootProps={{ className: "h-80 w-full" }}
      data={barGroupedChannelsData}
      dataKey="quarter"
      maxBarWidth={46}
      radius={[8, 8, 0, 0]}
      series={barGroupedChannelsSeries}
      valueFormatter={formatGroupedValue}
      withLegend
      yAxisProps={{ width: 56 }}
    />
  </div>
);

export default {
  title: "Components/Chart Complete/Bar/GroupedChannels",
  component: BarChart,
  tags: ["autodocs"],
} satisfies Meta<typeof BarChart>;

type Story = StoryObj<typeof BarChart>;

export const BarChartCompleteGroupedChannels: Story = {
  args: {
    data: barGroupedChannelsData,
    dataKey: "quarter",
    series: barGroupedChannelsSeries,
  },
  render: () => <BarChartCompleteGroupedChannelsDemo />,
};
