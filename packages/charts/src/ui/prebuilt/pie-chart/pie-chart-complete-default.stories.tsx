import type { Meta, StoryObj } from "@storybook/react";

import {
  completeChartShellClassName,
  formatNumberCompact,
} from "../stories/complete-chart-story-shared";
import { PieChart } from "./pie-chart";
import { pieDefaultData, pieDefaultSeries } from "./pie-chart-story-data";

const pieValueFormatter = (value: number): string =>
  `$${formatNumberCompact(value)}`;

const PieChartCompleteDefaultDemo = () => (
  <div className={completeChartShellClassName}>
    <PieChart
      chartRootProps={{ className: "h-80 w-full" }}
      data={pieDefaultData}
      dataKey="value"
      labelMode="value"
      paddingAngle={2}
      series={pieDefaultSeries}
      size="82%"
      strokeColor="var(--color-background)"
      strokeWidth={2}
      valueFormatter={pieValueFormatter}
      withLabels
      withLegend
    />
  </div>
);

export default {
  title: "Components/Chart Complete/Pie/Default",
  component: PieChart,
  tags: ["autodocs"],
} satisfies Meta<typeof PieChart>;

type Story = StoryObj<typeof PieChart>;

export const PieChartCompleteDefault: Story = {
  args: {
    data: pieDefaultData,
    dataKey: "value",
    series: pieDefaultSeries,
  },
  render: () => <PieChartCompleteDefaultDemo />,
};
