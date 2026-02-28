import type { Meta, StoryObj } from "@storybook/react";

import {
  completeChartShellVariants,
  formatSignedNumberCompact,
} from "../stories/complete-chart-story-shared";
import { BarChart } from "./bar-chart";
import {
  barNetFlowNegativeData,
  barNetFlowNegativeSeries,
} from "./bar-chart-story-data";

const formatNetFlowValue = (value: number) => formatSignedNumberCompact(value);

const BarChartCompleteNetFlowNegativeDemo = () => (
  <div className={completeChartShellVariants()}>
    <BarChart
      chartRootProps={{ className: "h-80 w-full" }}
      data={barNetFlowNegativeData}
      dataKey="month"
      referenceLines={[{ color: "var(--color-chart-4)", label: "Zero", y: 0 }]}
      series={barNetFlowNegativeSeries}
      valueFormatter={formatNetFlowValue}
      withLegend
      yAxisProps={{ width: 56 }}
    />
  </div>
);

export default {
  component: BarChart,
  tags: ["autodocs"],
  title: "Components/Chart Complete/Bar/NetFlowNegative",
} satisfies Meta<typeof BarChart>;

type Story = StoryObj<typeof BarChart>;

export const BarChartCompleteNetFlowNegative: Story = {
  args: {
    data: barNetFlowNegativeData,
    dataKey: "month",
    series: barNetFlowNegativeSeries,
  },
  render: () => <BarChartCompleteNetFlowNegativeDemo />,
};
