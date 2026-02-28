import type { Meta, StoryObj } from "@storybook/react";

import {
  completeChartShellVariants,
  formatNumberCompact,
} from "../stories/complete-chart-story-shared";
import { LineChart } from "./line-chart";
import {
  lineKpiDualAxisData,
  lineKpiDualAxisSeries,
} from "./line-chart-story-data";

const formatKpiValue = (value: number, seriesKey: string) => {
  if (seriesKey === "nps") {
    return `${value}`;
  }

  return formatNumberCompact(value);
};

const LineChartCompleteKpiDualAxisDemo = () => (
  <div className={completeChartShellVariants()}>
    <LineChart
      lineChartProps={{ margin: { bottom: 0, left: 0, right: 8, top: 8 } }}
      chartRootProps={{ className: "h-80 w-full" }}
      data={lineKpiDualAxisData}
      dataKey="month"
      referenceLines={[
        {
          color: "var(--color-chart-4)",
          label: "NPS Goal",
          strokeDasharray: "4 4",
          y: 45,
        },
      ]}
      rightYAxisProps={{ width: 48, yAxisId: "right-axis" }}
      series={lineKpiDualAxisSeries}
      tooltipProps={{ axisId: "left-axis", defaultIndex: 3, trigger: "click" }}
      valueFormatter={formatKpiValue}
      withDots={false}
      withLegend
      withRightYAxis
      yAxisProps={{ width: 64, yAxisId: "left-axis" }}
    />
  </div>
);

export default {
  component: LineChart,
  tags: ["autodocs"],
  title: "Components/Chart Complete/Line/KpiDualAxis",
} satisfies Meta<typeof LineChart>;

type Story = StoryObj<typeof LineChart>;

export const LineChartCompleteKpiDualAxis: Story = {
  args: {
    data: lineKpiDualAxisData,
    dataKey: "month",
    series: lineKpiDualAxisSeries,
  },
  render: () => <LineChartCompleteKpiDualAxisDemo />,
};
