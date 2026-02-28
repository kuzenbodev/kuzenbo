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
      composedChartProps={{ margin: { bottom: 0, left: 0, right: 10, top: 8 } }}
      chartRootProps={{ className: "h-80 w-full" }}
      data={compositeFunnelBlendData}
      dataKey="stage"
      lineProps={{ strokeWidth: 3 }}
      referenceLines={[
        {
          color: "var(--color-chart-4)",
          label: "Conversion Goal",
          strokeDasharray: "4 4",
          y: 20,
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
  component: CompositeChart,
  tags: ["autodocs"],
  title: "Components/Chart Complete/Composite/FunnelBlend",
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
