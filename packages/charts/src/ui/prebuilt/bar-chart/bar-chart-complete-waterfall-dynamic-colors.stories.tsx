import type { Meta, StoryObj } from "@storybook/react";

import { completeChartShellClassName } from "../stories/complete-chart-story-shared";
import { BarChart } from "./bar-chart";

const waterfallData = [
  { month: "Jan", net: 112 },
  { month: "Feb", net: -34 },
  { month: "Mar", net: 46 },
  { month: "Apr", net: -22 },
  { month: "May", net: 38, standalone: true },
  { month: "Jun", net: 19 },
];

const waterfallSeries = [{ label: "Net Change", name: "net" }];

const formatDelta = (value: number) =>
  value > 0 ? `+${value.toLocaleString()}` : value.toLocaleString();
const getWaterfallBarColor = (value: number) => {
  if (value < 0) {
    return "var(--color-danger-foreground)";
  }

  return "var(--color-success-foreground)";
};

const BarChartCompleteWaterfallDynamicColorsDemo = () => (
  <div className={completeChartShellClassName}>
    <BarChart
      chartRootProps={{ className: "h-80 w-full" }}
      data={waterfallData}
      dataKey="month"
      getBarColor={getWaterfallBarColor}
      series={waterfallSeries}
      type="waterfall"
      valueFormatter={formatDelta}
      withBarValueLabel
      withLegend
      yAxisProps={{ width: 56 }}
    />
  </div>
);

export default {
  title: "Components/Chart Complete/Bar/WaterfallDynamicColors",
  component: BarChart,
  tags: ["autodocs"],
} satisfies Meta<typeof BarChart>;

type Story = StoryObj<typeof BarChart>;

export const BarChartCompleteWaterfallDynamicColors: Story = {
  args: {
    data: waterfallData,
    dataKey: "month",
    series: waterfallSeries,
  },
  render: () => <BarChartCompleteWaterfallDynamicColorsDemo />,
};
