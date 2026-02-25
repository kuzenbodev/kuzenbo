import type { Meta, StoryObj } from "@storybook/react";

import {
  completeChartShellClassName,
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
  <div className={completeChartShellClassName}>
    <BarChart
      chartRootProps={{ className: "h-80 w-full" }}
      data={barDualAxisGoalsData}
      dataKey="month"
      rightYAxisProps={{ yAxisId: "right-axis", width: 54 }}
      series={barDualAxisGoalsSeries}
      tooltipProps={{ axisId: "left-axis", defaultIndex: 4, shared: true }}
      valueFormatter={formatDualAxisValue}
      withLegend
      withRightYAxis
      yAxisProps={{ yAxisId: "left-axis", width: 64 }}
    />
  </div>
);

export default {
  title: "Components/Chart Complete/Bar/DualAxisGoals",
  component: BarChart,
  tags: ["autodocs"],
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
