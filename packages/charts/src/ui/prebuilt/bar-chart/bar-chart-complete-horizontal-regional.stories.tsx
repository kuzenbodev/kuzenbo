import type { Meta, StoryObj } from "@storybook/react";

import {
  completeChartShellVariants,
  formatNumberCompact,
} from "../stories/complete-chart-story-shared";
import { BarChart } from "./bar-chart";
import {
  barHorizontalRegionalData,
  barHorizontalRegionalSeries,
} from "./bar-chart-story-data";

const formatRegionalValue = (value: number) => formatNumberCompact(value);

const BarChartCompleteHorizontalRegionalDemo = () => (
  <div className={completeChartShellVariants()}>
    <BarChart
      barChartProps={{
        layout: "vertical",
        margin: { bottom: 8, left: 18, right: 12, top: 8 },
      }}
      chartRootProps={{ className: "h-80 w-full" }}
      data={barHorizontalRegionalData}
      dataKey="region"
      gridAxis="y"
      series={barHorizontalRegionalSeries}
      valueFormatter={formatRegionalValue}
      withLegend
      xAxisProps={{ type: "number" }}
      yAxisProps={{ dataKey: "region", type: "category", width: 110 }}
    />
  </div>
);

export default {
  component: BarChart,
  tags: ["autodocs"],
  title: "Components/Chart Complete/Bar/HorizontalRegional",
} satisfies Meta<typeof BarChart>;

type Story = StoryObj<typeof BarChart>;

export const BarChartCompleteHorizontalRegional: Story = {
  args: {
    data: barHorizontalRegionalData,
    dataKey: "region",
    series: barHorizontalRegionalSeries,
  },
  render: () => <BarChartCompleteHorizontalRegionalDemo />,
};
