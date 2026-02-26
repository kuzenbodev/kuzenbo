import type { Meta, StoryObj } from "@storybook/react";

import { completeChartShellVariants } from "../stories/complete-chart-story-shared";
import { Sparkline } from "./sparkline";
import {
  sparklineChurnRiskData,
  sparklineLatencyData,
} from "./sparkline-story-data";

const SparklineCompleteCurveNullsDemo = () => (
  <div className={completeChartShellVariants()}>
    <div className="grid gap-4">
      <Sparkline
        chartRootProps={{ className: "h-24 w-full" }}
        connectNulls={false}
        curveType="stepAfter"
        data={sparklineChurnRiskData}
        dataKey="week"
        valueKey="churnRisk"
      />
      <Sparkline
        chartRootProps={{ className: "h-24 w-full" }}
        curveType="natural"
        data={sparklineLatencyData}
        dataKey="hour"
        valueKey="latency"
        withGradient={false}
      />
    </div>
  </div>
);

export default {
  title: "Components/Chart Complete/Sparkline/Curve And Nulls",
  component: Sparkline,
  tags: ["autodocs"],
} satisfies Meta<typeof Sparkline>;

type Story = StoryObj<typeof Sparkline>;

export const SparklineCompleteCurveNulls: Story = {
  args: {
    data: sparklineChurnRiskData,
    dataKey: "week",
    valueKey: "churnRisk",
  },
  render: () => <SparklineCompleteCurveNullsDemo />,
};
