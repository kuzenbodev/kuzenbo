import type { Meta, StoryObj } from "@storybook/react";

import { completeChartShellVariants } from "../stories/complete-chart-story-shared";
import { BarChart } from "./bar-chart";

const percentStackedData = [
  { month: "Jan", partner: 0.2, salesLed: 0.38, selfServe: 0.42 },
  { month: "Feb", partner: 0.2, salesLed: 0.35, selfServe: 0.45 },
  { month: "Mar", partner: 0.23, salesLed: 0.33, selfServe: 0.44 },
  { month: "Apr", partner: 0.22, salesLed: 0.31, selfServe: 0.47 },
  { month: "May", partner: 0.23, salesLed: 0.29, selfServe: 0.48 },
  { month: "Jun", partner: 0.22, salesLed: 0.28, selfServe: 0.5 },
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
  component: BarChart,
  tags: ["autodocs"],
  title: "Components/Chart Complete/Bar/PercentStackedLabels",
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
