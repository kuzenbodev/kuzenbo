import type { Meta, StoryObj } from "@storybook/react";

import { completeChartShellVariants } from "../stories/complete-chart-story-shared";
import { ScatterChart } from "./scatter-chart";
import { scatterDefaultSeries } from "./scatter-chart-story-data";

const ScatterChartCompleteDefaultDemo = () => (
  <div className={completeChartShellVariants()}>
    <ScatterChart
      chartRootProps={{ className: "h-80 w-full" }}
      series={scatterDefaultSeries}
      withLegend
      xKey="effort"
      xUnit="h"
      yKey="impact"
      yUnit="pts"
    />
  </div>
);

export default {
  title: "Components/Chart Complete/Scatter/Default",
  component: ScatterChart,
  tags: ["autodocs"],
} satisfies Meta<typeof ScatterChart>;

type Story = StoryObj<typeof ScatterChart>;

export const ScatterChartCompleteDefault: Story = {
  args: {
    series: scatterDefaultSeries,
    xKey: "effort",
    yKey: "impact",
  },
  render: () => <ScatterChartCompleteDefaultDemo />,
};
