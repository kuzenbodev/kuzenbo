import type { Meta, StoryObj } from "@storybook/react";

import { completeChartShellVariants } from "../stories/complete-chart-story-shared";
import { ScatterChart } from "./scatter-chart";
import { scatterAxisFocusSeries } from "./scatter-chart-story-data";

const formatConversion = (value: number) => `${value.toFixed(1)}%`;
const formatDays = (value: number) => `${Math.round(value)}d`;

const ScatterChartCompleteAxisFormattersDemo = () => (
  <div className={completeChartShellVariants()}>
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
  component: ScatterChart,
  tags: ["autodocs"],
  title: "Components/Chart Complete/Scatter/AxisFormatters",
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
