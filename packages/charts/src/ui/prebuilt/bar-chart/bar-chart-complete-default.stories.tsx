import type { Meta, StoryObj } from "@storybook/react";

import { completeChartShellVariants } from "../stories/complete-chart-story-shared";
import { BarChart } from "./bar-chart";
import { barDefaultData, barDefaultSeries } from "./bar-chart-story-data";

const BarChartCompleteDefaultDemo = () => (
  <div className={completeChartShellVariants()}>
    <BarChart
      chartRootProps={{ className: "h-80 w-full" }}
      data={barDefaultData}
      dataKey="month"
      series={barDefaultSeries}
      tooltipProps={{ shared: true }}
      withLegend
    />
  </div>
);

export default {
  component: BarChart,
  tags: ["autodocs"],
  title: "Components/Chart Complete/Bar/Default",
} satisfies Meta<typeof BarChart>;

type Story = StoryObj<typeof BarChart>;

export const BarChartCompleteDefault: Story = {
  args: {
    data: barDefaultData,
    dataKey: "month",
    series: barDefaultSeries,
  },
  render: () => <BarChartCompleteDefaultDemo />,
};
