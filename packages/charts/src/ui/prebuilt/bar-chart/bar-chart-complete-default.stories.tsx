import type { Meta, StoryObj } from "@storybook/react";

import { completeChartShellClassName } from "../stories/complete-chart-story-shared";
import { BarChart } from "./bar-chart";
import { barDefaultData, barDefaultSeries } from "./bar-chart-story-data";

const BarChartCompleteDefaultDemo = () => (
  <div className={completeChartShellClassName}>
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
  title: "Components/Chart Complete/Bar/Default",
  component: BarChart,
  tags: ["autodocs"],
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
