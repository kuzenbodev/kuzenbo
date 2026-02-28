import type { Meta, StoryObj } from "@storybook/react";

import { completeChartShellVariants } from "../stories/complete-chart-story-shared";
import { Sparkline } from "./sparkline";
import { sparklineChurnRiskData } from "./sparkline-story-data";

const SparklineCompleteTrendColorsDemo = () => (
  <div className={completeChartShellVariants()}>
    <Sparkline
      chartRootProps={{ className: "h-24 w-full" }}
      data={sparklineChurnRiskData}
      dataKey="week"
      label="Churn Risk"
      trendColors={{
        down: "var(--color-success-foreground)",
        flat: "var(--color-chart-3)",
        up: "var(--color-danger-foreground)",
      }}
      valueKey="churnRisk"
      withTooltip
    />
  </div>
);

export default {
  component: Sparkline,
  tags: ["autodocs"],
  title: "Components/Chart Complete/Sparkline/Trend Colors",
} satisfies Meta<typeof Sparkline>;

type Story = StoryObj<typeof Sparkline>;

export const SparklineCompleteTrendColors: Story = {
  args: {
    data: sparklineChurnRiskData,
    dataKey: "week",
    valueKey: "churnRisk",
  },
  render: () => <SparklineCompleteTrendColorsDemo />,
};
