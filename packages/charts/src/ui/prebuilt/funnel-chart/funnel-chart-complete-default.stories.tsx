import type { Meta, StoryObj } from "@storybook/react";

import {
  completeChartShellClassName,
  formatNumberCompact,
} from "../stories/complete-chart-story-shared";
import { FunnelChart } from "./funnel-chart";
import {
  funnelDefaultData,
  funnelDefaultSeries,
} from "./funnel-chart-story-data";

const FunnelChartCompleteDefaultDemo = () => (
  <div className={completeChartShellClassName}>
    <FunnelChart
      chartRootProps={{ className: "h-80 w-full" }}
      data={funnelDefaultData}
      dataKey="value"
      series={funnelDefaultSeries}
      valueFormatter={formatNumberCompact}
      withLabels
      withLegend
    />
  </div>
);

export default {
  title: "Components/Chart Complete/Funnel/Default",
  component: FunnelChart,
  tags: ["autodocs"],
} satisfies Meta<typeof FunnelChart>;

type Story = StoryObj<typeof FunnelChart>;

export const FunnelChartCompleteDefault: Story = {
  args: {
    data: funnelDefaultData,
    dataKey: "value",
    series: funnelDefaultSeries,
  },
  render: () => <FunnelChartCompleteDefaultDemo />,
};
