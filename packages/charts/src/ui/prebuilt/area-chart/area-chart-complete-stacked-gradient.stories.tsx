import type { Meta, StoryObj } from "@storybook/react";

import { completeChartShellClassName } from "../stories/complete-chart-story-shared";
import { AreaChart } from "./area-chart";
import {
  areaStackedDemandData,
  areaStackedDemandSeries,
} from "./area-chart-story-data";

const AreaChartCompleteStackedGradientDemo = () => (
  <div className={completeChartShellClassName}>
    <AreaChart
      activeDotProps={{ r: 6 }}
      chartRootProps={{ className: "h-80 w-full" }}
      data={areaStackedDemandData}
      dataKey="week"
      dotProps={{ r: 4, strokeWidth: 1 }}
      series={areaStackedDemandSeries}
      type="stacked"
      withDots
      withGradient
      withLegend
    />
  </div>
);

export default {
  title: "Components/Chart Complete/Area/StackedGradient",
  component: AreaChart,
  tags: ["autodocs"],
} satisfies Meta<typeof AreaChart>;

type Story = StoryObj<typeof AreaChart>;

export const AreaChartCompleteStackedGradient: Story = {
  args: {
    data: areaStackedDemandData,
    dataKey: "week",
    series: areaStackedDemandSeries,
  },
  render: () => <AreaChartCompleteStackedGradientDemo />,
};
