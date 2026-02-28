import type { Meta, StoryObj } from "@storybook/react";

import {
  completeChartShellVariants,
  formatCurrencyCompact,
} from "../stories/complete-chart-story-shared";
import { AreaChart } from "./area-chart";
import { areaDefaultData, areaDefaultSeries } from "./area-chart-story-data";

const formatAreaValue = (value: number) => formatCurrencyCompact(value);

const AreaChartCompleteDefaultDemo = () => (
  <div className={completeChartShellVariants()}>
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
  component: AreaChart,
  tags: ["autodocs"],
  title: "Components/Chart Complete/Area/Default",
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
