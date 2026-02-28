import type { Meta, StoryObj } from "@storybook/react";

import {
  completeChartShellVariants,
  formatCurrencyCompact,
  formatNumberCompact,
} from "../stories/complete-chart-story-shared";
import { BarChart } from "./bar-chart";
import {
  barDualAxisGoalsData,
  barDualAxisGoalsSeries,
} from "./bar-chart-story-data";

const formatDualAxisValue = (value: number, seriesKey: string) => {
  if (seriesKey === "spend") {
    return formatCurrencyCompact(value);
  }

  return formatNumberCompact(value);
};

const BarChartCompleteDualAxisGoalsDemo = () => (
  <div className={completeChartShellVariants()}>
    <BarChart
      chartRootProps={{ className: "h-80 w-full" }}
      data={barDualAxisGoalsData}
      dataKey="month"
      rightYAxisProps={{ width: 54, yAxisId: "right-axis" }}
      series={barDualAxisGoalsSeries}
      tooltipProps={{ axisId: "left-axis", defaultIndex: 4, shared: true }}
      valueFormatter={formatDualAxisValue}
      withLegend
      withRightYAxis
      yAxisProps={{ width: 64, yAxisId: "left-axis" }}
    />
  </div>
);

export default {
  component: BarChart,
  tags: ["autodocs"],
  title: "Components/Chart Complete/Bar/DualAxisGoals",
} satisfies Meta<typeof BarChart>;

type Story = StoryObj<typeof BarChart>;

export const BarChartCompleteDualAxisGoals: Story = {
  args: {
    data: barDualAxisGoalsData,
    dataKey: "month",
    series: barDualAxisGoalsSeries,
  },
  render: () => <BarChartCompleteDualAxisGoalsDemo />,
};
