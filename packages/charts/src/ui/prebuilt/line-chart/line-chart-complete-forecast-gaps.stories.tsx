import type { Meta, StoryObj } from "@storybook/react";

import {
  completeChartShellClassName,
  formatCurrencyCompact,
} from "../stories/complete-chart-story-shared";
import { LineChart } from "./line-chart";
import {
  lineForecastGapsData,
  lineForecastGapsSeries,
} from "./line-chart-story-data";

const formatForecastValue = (value: number) => formatCurrencyCompact(value);

const LineChartCompleteForecastGapsDemo = () => (
  <div className={completeChartShellClassName}>
    <LineChart
      lineChartProps={{ margin: { top: 8, right: 12, left: 4, bottom: 0 } }}
      chartRootProps={{ className: "h-80 w-full" }}
      connectNulls={false}
      data={lineForecastGapsData}
      dataKey="month"
      referenceLines={[
        {
          y: 150_000,
          color: "var(--color-chart-5)",
          strokeDasharray: "3 4",
          label: "Quarter Plan",
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
  title: "Components/Chart Complete/Line/ForecastGaps",
  component: LineChart,
  tags: ["autodocs"],
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
