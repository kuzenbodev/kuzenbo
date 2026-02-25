import type { Meta, StoryObj } from "@storybook/react";

import {
  completeChartShellClassName,
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
  <div className={completeChartShellClassName}>
    <LineChart
      lineChartProps={{ margin: { top: 8, right: 8, left: 0, bottom: 0 } }}
      chartRootProps={{ className: "h-80 w-full" }}
      data={lineKpiDualAxisData}
      dataKey="month"
      referenceLines={[
        {
          y: 45,
          color: "var(--color-chart-4)",
          strokeDasharray: "4 4",
          label: "NPS Goal",
        },
      ]}
      rightYAxisProps={{ yAxisId: "right-axis", width: 48 }}
      series={lineKpiDualAxisSeries}
      tooltipProps={{ axisId: "left-axis", defaultIndex: 3, trigger: "click" }}
      valueFormatter={formatKpiValue}
      withDots={false}
      withLegend
      withRightYAxis
      yAxisProps={{ yAxisId: "left-axis", width: 64 }}
    />
  </div>
);

export default {
  title: "Components/Chart Complete/Line/KpiDualAxis",
  component: LineChart,
  tags: ["autodocs"],
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
