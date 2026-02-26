import type { Meta, StoryObj } from "@storybook/react";

import {
  completeChartShellVariants,
  formatCurrencyCompact,
  formatPercent,
} from "../stories/complete-chart-story-shared";
import { CompositeChart } from "./composite-chart";
import {
  compositeNullsAndZeroesData,
  compositeNullsAndZeroesSeries,
} from "./composite-chart-story-data";

const formatNullAndZeroValue = (value: number, seriesKey: string) => {
  if (seriesKey === "conversionRate") {
    return formatPercent(value);
  }

  return formatCurrencyCompact(value);
};

const CompositeChartCompleteNullsAndZeroesDemo = () => (
  <div className={completeChartShellVariants()}>
    <CompositeChart
      chartRootProps={{ className: "h-80 w-full" }}
      connectNulls={false}
      data={compositeNullsAndZeroesData}
      dataKey="month"
      referenceLines={[{ y: 0, color: "var(--color-chart-4)", label: "Zero" }]}
      rightYAxisProps={{ width: 52, yAxisId: "conversion-axis" }}
      series={compositeNullsAndZeroesSeries}
      tooltipProps={{ shared: true, trigger: "hover" }}
      valueFormatter={formatNullAndZeroValue}
      withDots={false}
      withLegend
      withRightYAxis
      yAxisProps={{ width: 62, yAxisId: "revenue-axis" }}
    />
  </div>
);

export default {
  title: "Components/Chart Complete/Composite/NullsAndZeroes",
  component: CompositeChart,
  tags: ["autodocs"],
} satisfies Meta<typeof CompositeChart>;

type Story = StoryObj<typeof CompositeChart>;

export const CompositeChartCompleteNullsAndZeroes: Story = {
  args: {
    data: compositeNullsAndZeroesData,
    dataKey: "month",
    series: compositeNullsAndZeroesSeries,
  },
  render: () => <CompositeChartCompleteNullsAndZeroesDemo />,
};
