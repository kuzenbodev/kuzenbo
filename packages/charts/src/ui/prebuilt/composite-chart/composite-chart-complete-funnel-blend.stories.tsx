import type { Meta, StoryObj } from "@storybook/react";

import {
  completeChartShellVariants,
  formatNumberCompact,
  formatPercent,
} from "../stories/complete-chart-story-shared";
import { CompositeChart } from "./composite-chart";
import {
  compositeFunnelBlendData,
  compositeFunnelBlendSeries,
} from "./composite-chart-story-data";

const formatFunnelValue = (value: number, seriesKey: string) => {
  if (seriesKey === "conversion") {
    return formatPercent(value);
  }

  return formatNumberCompact(value);
};

const CompositeChartCompleteFunnelBlendDemo = () => (
  <div className={completeChartShellVariants()}>
    <CompositeChart
      areaProps={{ fillOpacity: 0.18 }}
      barProps={{ radius: [8, 8, 0, 0] }}
      composedChartProps={{ margin: { top: 8, right: 10, left: 0, bottom: 0 } }}
      chartRootProps={{ className: "h-80 w-full" }}
      data={compositeFunnelBlendData}
      dataKey="stage"
      lineProps={{ strokeWidth: 3 }}
      referenceLines={[
        {
          y: 20,
          color: "var(--color-chart-4)",
          strokeDasharray: "4 4",
          label: "Conversion Goal",
        },
      ]}
      rightYAxisProps={{ width: 52, yAxisId: "conversion-axis" }}
      series={compositeFunnelBlendSeries}
      tooltipProps={{
        axisId: "volume-axis",
        defaultIndex: 2,
        trigger: "click",
      }}
      valueFormatter={formatFunnelValue}
      withLegend
      withRightYAxis
      yAxisProps={{ width: 56, yAxisId: "volume-axis" }}
    />
  </div>
);

export default {
  title: "Components/Chart Complete/Composite/FunnelBlend",
  component: CompositeChart,
  tags: ["autodocs"],
} satisfies Meta<typeof CompositeChart>;

type Story = StoryObj<typeof CompositeChart>;

export const CompositeChartCompleteFunnelBlend: Story = {
  args: {
    data: compositeFunnelBlendData,
    dataKey: "stage",
    series: compositeFunnelBlendSeries,
  },
  render: () => <CompositeChartCompleteFunnelBlendDemo />,
};
