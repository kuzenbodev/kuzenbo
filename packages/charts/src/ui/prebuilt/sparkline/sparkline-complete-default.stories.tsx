import type { Meta, StoryObj } from "@storybook/react";

import { completeChartShellClassName } from "../stories/complete-chart-story-shared";
import { Sparkline } from "./sparkline";
import { sparklineRevenueData } from "./sparkline-story-data";

const sparklineValueFormatter = (value: number): string =>
  `$${value.toLocaleString("en-US")}`;

const SparklineCompleteDefaultDemo = () => (
  <div className={completeChartShellClassName}>
    <Sparkline
      chartRootProps={{ className: "h-28 w-full" }}
      data={sparklineRevenueData}
      dataKey="day"
      label="Revenue"
      valueKey="revenue"
      valueFormatter={sparklineValueFormatter}
      withTooltip
    />
  </div>
);

export default {
  title: "Components/Chart Complete/Sparkline/Default",
  component: Sparkline,
  tags: ["autodocs"],
} satisfies Meta<typeof Sparkline>;

type Story = StoryObj<typeof Sparkline>;

export const SparklineCompleteDefault: Story = {
  args: {
    data: sparklineRevenueData,
    dataKey: "day",
    valueKey: "revenue",
  },
  render: () => <SparklineCompleteDefaultDemo />,
};
