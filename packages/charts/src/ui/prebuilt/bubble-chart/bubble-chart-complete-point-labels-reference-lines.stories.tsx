import type { Meta, StoryObj } from "@storybook/react";

import { completeChartShellClassName } from "../stories/complete-chart-story-shared";
import { BubbleChart } from "./bubble-chart";
import { bubblePointLabelSeries } from "./bubble-chart-story-data";

const BubbleChartCompletePointLabelsReferenceLinesDemo = () => (
  <div className={completeChartShellClassName}>
    <BubbleChart
      chartRootProps={{ className: "h-80 w-full" }}
      pointLabelDataKey="score"
      referenceLines={[
        { color: "var(--color-border)", label: "Complexity cap", x: 3 },
        { color: "var(--color-border)", label: "Value goal", y: 80 },
      ]}
      series={bubblePointLabelSeries}
      withPointLabels
      xKey="complexity"
      yKey="value"
      zKey="potential"
    />
  </div>
);

export default {
  title: "Components/Chart Complete/Bubble/PointLabelsReferenceLines",
  component: BubbleChart,
  tags: ["autodocs"],
} satisfies Meta<typeof BubbleChart>;

type Story = StoryObj<typeof BubbleChart>;

export const BubbleChartCompletePointLabelsReferenceLines: Story = {
  args: {
    series: bubblePointLabelSeries,
    xKey: "complexity",
    yKey: "value",
    zKey: "potential",
  },
  render: () => <BubbleChartCompletePointLabelsReferenceLinesDemo />,
};
