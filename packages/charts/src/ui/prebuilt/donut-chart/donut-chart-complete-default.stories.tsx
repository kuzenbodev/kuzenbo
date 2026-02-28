import type { Meta, StoryObj } from "@storybook/react";

import {
  completeChartShellVariants,
  formatNumberCompact,
} from "../stories/complete-chart-story-shared";
import { DonutChart } from "./donut-chart";
import type { DonutCenterLabelContext } from "./donut-chart";
import { donutDefaultData, donutDefaultSeries } from "./donut-chart-story-data";

const donutCenterLabel = ({ total }: DonutCenterLabelContext): string =>
  formatNumberCompact(total);

const DonutChartCompleteDefaultDemo = () => (
  <div className={completeChartShellVariants()}>
    <DonutChart
      centerLabel={donutCenterLabel}
      chartRootProps={{ className: "h-80 w-full" }}
      data={donutDefaultData}
      dataKey="value"
      labelMode="percent"
      paddingAngle={2}
      series={donutDefaultSeries}
      size="84%"
      strokeColor="var(--color-background)"
      strokeWidth={2}
      thickness={22}
      withLabels
      withLegend
    />
  </div>
);

export default {
  component: DonutChart,
  tags: ["autodocs"],
  title: "Components/Chart Complete/Donut/Default",
} satisfies Meta<typeof DonutChart>;

type Story = StoryObj<typeof DonutChart>;

export const DonutChartCompleteDefault: Story = {
  args: {
    data: donutDefaultData,
    dataKey: "value",
    series: donutDefaultSeries,
  },
  render: () => <DonutChartCompleteDefaultDemo />,
};
