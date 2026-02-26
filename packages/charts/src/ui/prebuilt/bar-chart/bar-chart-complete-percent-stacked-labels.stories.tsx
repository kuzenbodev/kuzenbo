import type { Meta, StoryObj } from "@storybook/react";

import { completeChartShellVariants } from "../stories/complete-chart-story-shared";
import { BarChart } from "./bar-chart";

const percentStackedData = [
  { month: "Jan", selfServe: 0.42, salesLed: 0.38, partner: 0.2 },
  { month: "Feb", selfServe: 0.45, salesLed: 0.35, partner: 0.2 },
  { month: "Mar", selfServe: 0.44, salesLed: 0.33, partner: 0.23 },
  { month: "Apr", selfServe: 0.47, salesLed: 0.31, partner: 0.22 },
  { month: "May", selfServe: 0.48, salesLed: 0.29, partner: 0.23 },
  { month: "Jun", selfServe: 0.5, salesLed: 0.28, partner: 0.22 },
];

const percentStackedSeries = [
  { label: "Self-Serve", name: "selfServe" },
  { label: "Sales-Led", name: "salesLed" },
  { label: "Partner", name: "partner" },
];

const BarChartCompletePercentStackedLabelsDemo = () => (
  <div className={completeChartShellVariants()}>
    <BarChart
      chartRootProps={{ className: "h-80 w-full" }}
      data={percentStackedData}
      dataKey="month"
      series={percentStackedSeries}
      type="percent"
      withBarValueLabel
      withLegend
      yAxisProps={{ ticks: [0, 0.25, 0.5, 0.75, 1], width: 56 }}
    />
  </div>
);

export default {
  title: "Components/Chart Complete/Bar/PercentStackedLabels",
  component: BarChart,
  tags: ["autodocs"],
} satisfies Meta<typeof BarChart>;

type Story = StoryObj<typeof BarChart>;

export const BarChartCompletePercentStackedLabels: Story = {
  args: {
    data: percentStackedData,
    dataKey: "month",
    series: percentStackedSeries,
  },
  render: () => <BarChartCompletePercentStackedLabelsDemo />,
};
