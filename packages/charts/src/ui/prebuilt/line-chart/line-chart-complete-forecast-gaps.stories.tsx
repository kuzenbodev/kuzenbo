import type { Meta, StoryObj } from "@storybook/react";

import {
  completeChartShellVariants,
  formatCurrencyCompact,
} from "../stories/complete-chart-story-shared";
import { LineChart } from "./line-chart";
import {
  lineForecastGapsData,
  lineForecastGapsSeries,
} from "./line-chart-story-data";

const formatForecastValue = (value: number) => formatCurrencyCompact(value);

const LineChartCompleteForecastGapsDemo = () => (
  <div className={completeChartShellVariants()}>
    <LineChart
      lineChartProps={{ margin: { bottom: 0, left: 4, right: 12, top: 8 } }}
      chartRootProps={{ className: "h-80 w-full" }}
      connectNulls={false}
      data={lineForecastGapsData}
      dataKey="month"
      referenceLines={[
        {
          color: "var(--color-chart-5)",
          label: "Quarter Plan",
          strokeDasharray: "3 4",
          y: 150_000,
        },
      ]}
      series={lineForecastGapsSeries}
      strokeWidth={2}
      tooltipProps={{ cursor: false, trigger: "hover" }}
      valueFormatter={formatForecastValue}
      withDots={false}
      withLegend
      xAxisProps={{ interval: 0 }}
      yAxisProps={{ width: 64 }}
    />
  </div>
);

export default {
  component: LineChart,
  tags: ["autodocs"],
  title: "Components/Chart Complete/Line/ForecastGaps",
} satisfies Meta<typeof LineChart>;

type Story = StoryObj<typeof LineChart>;

export const LineChartCompleteForecastGaps: Story = {
  args: {
    data: lineForecastGapsData,
    dataKey: "month",
    series: lineForecastGapsSeries,
  },
  render: () => <LineChartCompleteForecastGapsDemo />,
};
