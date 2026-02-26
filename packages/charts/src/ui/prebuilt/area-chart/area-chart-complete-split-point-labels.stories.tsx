import type { Meta, StoryObj } from "@storybook/react";

import {
  completeChartShellVariants,
  formatSignedNumberCompact,
} from "../stories/complete-chart-story-shared";
import { AreaChart } from "./area-chart";
import {
  areaSplitSignalData,
  areaSplitSignalSeries,
} from "./area-chart-story-data";

const formatSplitValue = (value: number) => formatSignedNumberCompact(value);

const AreaChartCompleteSplitPointLabelsDemo = () => (
  <div className={completeChartShellVariants()}>
    <AreaChart
      chartRootProps={{ className: "h-80 w-full" }}
      data={areaSplitSignalData}
      dataKey="month"
      referenceLines={[{ label: "Zero", y: 0 }]}
      series={areaSplitSignalSeries}
      type="split"
      valueFormatter={formatSplitValue}
      withDots
      withLegend
      withPointLabels
    />
  </div>
);

export default {
  title: "Components/Chart Complete/Area/SplitPointLabels",
  component: AreaChart,
  tags: ["autodocs"],
} satisfies Meta<typeof AreaChart>;

type Story = StoryObj<typeof AreaChart>;

export const AreaChartCompleteSplitPointLabels: Story = {
  args: {
    data: areaSplitSignalData,
    dataKey: "month",
    series: areaSplitSignalSeries,
  },
  render: () => <AreaChartCompleteSplitPointLabelsDemo />,
};
