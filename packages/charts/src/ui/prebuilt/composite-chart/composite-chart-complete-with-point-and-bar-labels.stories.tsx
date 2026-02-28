import type { Meta, StoryObj } from "@storybook/react";

import {
  completeChartShellVariants,
  formatNumberCompact,
  formatPercent,
} from "../stories/complete-chart-story-shared";
import { CompositeChart } from "./composite-chart";
import {
  compositeLabelHeavyData,
  compositeLabelHeavySeries,
} from "./composite-chart-story-data";

const formatLabelHeavyValue = (value: number, seriesKey: string) => {
  if (seriesKey === "winRate") {
    return formatPercent(value);
  }

  return formatNumberCompact(value);
};

const CompositeChartCompleteWithPointAndBarLabelsDemo = () => (
  <div className={completeChartShellVariants()}>
    <CompositeChart
      chartRootProps={{ className: "h-80 w-full" }}
      data={compositeLabelHeavyData}
      dataKey="week"
      rightYAxisProps={{ width: 52, yAxisId: "rate-axis" }}
      series={compositeLabelHeavySeries}
      valueFormatter={formatLabelHeavyValue}
      withBarValueLabel
      withLegend
      withPointLabels
      withRightYAxis
      yAxisProps={{ width: 56, yAxisId: "volume-axis" }}
    />
  </div>
);

export default {
  component: CompositeChart,
  tags: ["autodocs"],
  title: "Components/Chart Complete/Composite/WithPointAndBarLabels",
} satisfies Meta<typeof CompositeChart>;

type Story = StoryObj<typeof CompositeChart>;

export const CompositeChartCompleteWithPointAndBarLabels: Story = {
  args: {
    data: compositeLabelHeavyData,
    dataKey: "week",
    series: compositeLabelHeavySeries,
  },
  render: () => <CompositeChartCompleteWithPointAndBarLabelsDemo />,
};
