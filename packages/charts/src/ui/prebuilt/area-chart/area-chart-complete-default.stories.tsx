import type { Meta, StoryObj } from "@storybook/react";

import {
  completeChartShellClassName,
  formatCurrencyCompact,
} from "../stories/complete-chart-story-shared";
import { AreaChart } from "./area-chart";
import { areaDefaultData, areaDefaultSeries } from "./area-chart-story-data";

const formatAreaValue = (value: number) => formatCurrencyCompact(value);

const AreaChartCompleteDefaultDemo = () => (
  <div className={completeChartShellClassName}>
    <AreaChart
      chartRootProps={{ className: "h-80 w-full" }}
      data={areaDefaultData}
      dataKey="month"
      series={areaDefaultSeries}
      valueFormatter={formatAreaValue}
      withLegend
      withGradient
    />
  </div>
);

export default {
  title: "Components/Chart Complete/Area/Default",
  component: AreaChart,
  tags: ["autodocs"],
} satisfies Meta<typeof AreaChart>;

type Story = StoryObj<typeof AreaChart>;

export const AreaChartCompleteDefault: Story = {
  args: {
    data: areaDefaultData,
    dataKey: "month",
    series: areaDefaultSeries,
  },
  render: () => <AreaChartCompleteDefaultDemo />,
};
