import type { Meta, StoryObj } from "@storybook/react";

import {
  completeChartShellVariants,
  formatCurrencyCompact,
  formatNumberCompact,
} from "../stories/complete-chart-story-shared";
import { CompositeChart } from "./composite-chart";
import {
  compositeOpsMixData,
  compositeOpsMixSeries,
} from "./composite-chart-story-data";

const formatOpsValue = (value: number, seriesKey: string) => {
  if (seriesKey === "cogs") {
    return formatCurrencyCompact(value);
  }

  return formatNumberCompact(value);
};
const opsAreaProps = (seriesItem: { key?: string; name?: string }) =>
  (seriesItem.name ?? seriesItem.key) === "cogs" ? { fillOpacity: 0.14 } : {};
const opsBarProps = (seriesItem: { type: string }) =>
  seriesItem.type === "bar"
    ? {
        radius: [6, 6, 0, 0] as [number, number, number, number],
        strokeOpacity: 0.4,
        strokeWidth: 1,
      }
    : {};
const opsLineProps = (seriesItem: { key?: string; name?: string }) =>
  (seriesItem.name ?? seriesItem.key) === "incidents" ? { strokeWidth: 3 } : {};

const CompositeChartCompleteOpsMixStackedLineDemo = () => (
  <div className={completeChartShellVariants()}>
    <CompositeChart
      areaProps={opsAreaProps}
      barProps={opsBarProps}
      chartRootProps={{ className: "h-80 w-full" }}
      curveType="stepAfter"
      data={compositeOpsMixData}
      dataKey="month"
      lineProps={opsLineProps}
      rightYAxisProps={{ width: 60, yAxisId: "cost-axis" }}
      series={compositeOpsMixSeries}
      valueFormatter={formatOpsValue}
      withLegend
      withRightYAxis
      yAxisProps={{ width: 56, yAxisId: "hours-axis" }}
    />
  </div>
);

export default {
  component: CompositeChart,
  tags: ["autodocs"],
  title: "Components/Chart Complete/Composite/OpsMixStackedLine",
} satisfies Meta<typeof CompositeChart>;

type Story = StoryObj<typeof CompositeChart>;

export const CompositeChartCompleteOpsMixStackedLine: Story = {
  args: {
    data: compositeOpsMixData,
    dataKey: "month",
    series: compositeOpsMixSeries,
  },
  render: () => <CompositeChartCompleteOpsMixStackedLineDemo />,
};
