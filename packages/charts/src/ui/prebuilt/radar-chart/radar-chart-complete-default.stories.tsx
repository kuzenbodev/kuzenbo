import type { Meta, StoryObj } from "@storybook/react";

import { completeChartShellVariants } from "../stories/complete-chart-story-shared";
import { RadarChart } from "./radar-chart";
import { radarDefaultData, radarDefaultSeries } from "./radar-chart-story-data";

const RadarChartCompleteDefaultDemo = () => (
  <div className={completeChartShellVariants()}>
    <RadarChart
      chartRootProps={{ className: "h-80 w-full" }}
      data={radarDefaultData}
      dataKey="metric"
      series={radarDefaultSeries}
      withDots
      withLegend
    />
  </div>
);

export default {
  title: "Components/Chart Complete/Radar/Default",
  component: RadarChart,
  tags: ["autodocs"],
} satisfies Meta<typeof RadarChart>;

type Story = StoryObj<typeof RadarChart>;

export const RadarChartCompleteDefault: Story = {
  args: {
    data: radarDefaultData,
    dataKey: "metric",
    series: radarDefaultSeries,
  },
  render: () => <RadarChartCompleteDefaultDemo />,
};
