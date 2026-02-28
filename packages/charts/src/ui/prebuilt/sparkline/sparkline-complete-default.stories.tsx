import type { Meta, StoryObj } from "@storybook/react";

import { completeChartShellVariants } from "../stories/complete-chart-story-shared";
import { Sparkline } from "./sparkline";
import { sparklineRevenueData } from "./sparkline-story-data";

const sparklineValueFormatter = (value: number): string =>
  `$${value.toLocaleString("en-US")}`;

const SparklineCompleteDefaultDemo = () => (
  <div className={completeChartShellVariants()}>
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
  component: Sparkline,
  tags: ["autodocs"],
  title: "Components/Chart Complete/Sparkline/Default",
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
