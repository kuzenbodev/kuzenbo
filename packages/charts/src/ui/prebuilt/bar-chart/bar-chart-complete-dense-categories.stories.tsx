import type { Meta, StoryObj } from "@storybook/react";

import { completeChartShellVariants } from "../stories/complete-chart-story-shared";
import { BarChart } from "./bar-chart";
import {
  barDenseCategoriesData,
  barDenseCategoriesSeries,
} from "./bar-chart-story-data";

const BarChartCompleteDenseCategoriesDemo = () => (
  <div className={completeChartShellVariants()}>
    <BarChart
      chartRootProps={{ className: "h-80 w-full" }}
      data={barDenseCategoriesData}
      dataKey="channel"
      maxBarWidth={38}
      minBarSize={2}
      series={barDenseCategoriesSeries}
      withLegend={false}
      xAxisProps={{
        angle: -32,
        height: 84,
        interval: 0,
        textAnchor: "end",
        tickMargin: 8,
      }}
      yAxisProps={{ width: 50 }}
    />
  </div>
);

export default {
  title: "Components/Chart Complete/Bar/DenseCategories",
  component: BarChart,
  tags: ["autodocs"],
} satisfies Meta<typeof BarChart>;

type Story = StoryObj<typeof BarChart>;

export const BarChartCompleteDenseCategories: Story = {
  args: {
    data: barDenseCategoriesData,
    dataKey: "channel",
    series: barDenseCategoriesSeries,
  },
  render: () => <BarChartCompleteDenseCategoriesDemo />,
};
