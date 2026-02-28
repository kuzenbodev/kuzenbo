import type { Meta, StoryObj } from "@storybook/react";

import {
  completeChartShellVariants,
  formatPercent,
} from "../stories/complete-chart-story-shared";
import { AreaChart } from "./area-chart";
import {
  areaPercentMixData,
  areaPercentMixSeries,
} from "./area-chart-story-data";

const formatPercentValue = (value: number) => formatPercent(value);

const AreaChartCompletePercentRightAxisDemo = () => (
  <div className={completeChartShellVariants()}>
    <AreaChart
      chartRootProps={{ className: "h-80 w-full" }}
      data={areaPercentMixData}
      dataKey="quarter"
      rightYAxisProps={{ ticks: [0, 0.5, 1], width: 56, yAxisId: "mix-right" }}
      series={areaPercentMixSeries}
      tooltipProps={{ defaultIndex: 2, trigger: "click" }}
      type="percent"
      valueFormatter={formatPercentValue}
      withLegend
      withRightYAxis
      yAxisProps={{ ticks: [0, 0.5, 1], width: 56, yAxisId: "mix-left" }}
    />
  </div>
);

export default {
  component: AreaChart,
  tags: ["autodocs"],
  title: "Components/Chart Complete/Area/PercentRightAxis",
} satisfies Meta<typeof AreaChart>;

type Story = StoryObj<typeof AreaChart>;

export const AreaChartCompletePercentRightAxis: Story = {
  args: {
    data: areaPercentMixData,
    dataKey: "quarter",
    series: areaPercentMixSeries,
  },
  render: () => <AreaChartCompletePercentRightAxisDemo />,
};
