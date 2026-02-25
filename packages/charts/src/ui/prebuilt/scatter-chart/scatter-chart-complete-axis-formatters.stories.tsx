import type { Meta, StoryObj } from "@storybook/react";

import { completeChartShellClassName } from "../stories/complete-chart-story-shared";
import { ScatterChart } from "./scatter-chart";
import { scatterAxisFocusSeries } from "./scatter-chart-story-data";

const formatConversion = (value: number) => `${value.toFixed(1)}%`;
const formatDays = (value: number) => `${Math.round(value)}d`;

const ScatterChartCompleteAxisFormattersDemo = () => (
  <div className={completeChartShellClassName}>
    <ScatterChart
      chartRootProps={{ className: "h-80 w-full" }}
      series={scatterAxisFocusSeries}
      tooltipProps={{ defaultIndex: 1, trigger: "click" }}
      withLegend
      xAxisLabel="Conversion Rate"
      xKey="conversionRate"
      xValueFormatter={formatConversion}
      yAxisLabel="Cycle Days"
      yKey="cycleDays"
      yValueFormatter={formatDays}
    />
  </div>
);

export default {
  title: "Components/Chart Complete/Scatter/AxisFormatters",
  component: ScatterChart,
  tags: ["autodocs"],
} satisfies Meta<typeof ScatterChart>;

type Story = StoryObj<typeof ScatterChart>;

export const ScatterChartCompleteAxisFormatters: Story = {
  args: {
    series: scatterAxisFocusSeries,
    xKey: "conversionRate",
    yKey: "cycleDays",
  },
  render: () => <ScatterChartCompleteAxisFormattersDemo />,
};
