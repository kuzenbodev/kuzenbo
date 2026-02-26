import type { Meta, StoryObj } from "@storybook/react";

import {
  completeChartShellVariants,
  formatCurrencyCompact,
  formatNumberCompact,
} from "../stories/complete-chart-story-shared";
import { CompositeChart } from "./composite-chart";
import {
  compositeDefaultData,
  compositeDefaultSeries,
} from "./composite-chart-story-data";

const formatCompositeValue = (value: number, seriesKey: string) => {
  if (seriesKey === "conversionRate") {
    return `${value.toFixed(1)}%`;
  }

  if (seriesKey === "revenue" || seriesKey === "pipeline") {
    return formatCurrencyCompact(value);
  }

  return formatNumberCompact(value);
};

const CompositeChartCompleteHighlightDotsValueLabelsDemo = () => (
  <div className={completeChartShellVariants()}>
    <CompositeChart
      activeDotProps={{ r: 6, strokeWidth: 2 }}
      chartRootProps={{ className: "h-80 w-full" }}
      data={compositeDefaultData}
      dataKey="month"
      dotProps={{ r: 4, strokeWidth: 1 }}
      rightYAxisProps={{ width: 56, yAxisId: "conversion-axis" }}
      series={compositeDefaultSeries}
      withBarValueLabel
      withDots
      withLegend
      withPointLabels
      withRightYAxis
      yAxisProps={{ width: 56, yAxisId: "revenue-axis" }}
      valueFormatter={formatCompositeValue}
    />
  </div>
);

export default {
  title: "Components/Chart Complete/Composite/HighlightDotsValueLabels",
  component: CompositeChart,
  tags: ["autodocs"],
} satisfies Meta<typeof CompositeChart>;

type Story = StoryObj<typeof CompositeChart>;

export const CompositeChartCompleteHighlightDotsValueLabels: Story = {
  args: {
    data: compositeDefaultData,
    dataKey: "month",
    series: compositeDefaultSeries,
  },
  render: () => <CompositeChartCompleteHighlightDotsValueLabelsDemo />,
};
