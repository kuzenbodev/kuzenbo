import type { Meta, StoryObj } from "@storybook/react";

import {
  completeChartShellVariants,
  formatPercent,
} from "../stories/complete-chart-story-shared";
import { RadialBarChart } from "./radial-bar-chart";
import {
  radialBarDefaultData,
  radialBarDefaultSeries,
} from "./radial-bar-chart-story-data";

const RadialBarChartCompleteDefaultDemo = () => (
  <div className={completeChartShellVariants()}>
    <RadialBarChart
      chartRootProps={{ className: "h-80 w-full" }}
      data={radialBarDefaultData}
      dataKey="value"
      labelMode="value"
      labelPosition="inside"
      series={radialBarDefaultSeries}
      valueFormatter={formatPercent}
      withBackground
      withLabels
      withLegend
    />
  </div>
);

export default {
  title: "Components/Chart Complete/RadialBar/Default",
  component: RadialBarChart,
  tags: ["autodocs"],
} satisfies Meta<typeof RadialBarChart>;

type Story = StoryObj<typeof RadialBarChart>;

export const RadialBarChartCompleteDefault: Story = {
  args: {
    data: radialBarDefaultData,
    dataKey: "value",
    series: radialBarDefaultSeries,
  },
  render: () => <RadialBarChartCompleteDefaultDemo />,
};
