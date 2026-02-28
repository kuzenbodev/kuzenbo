import type { Meta, StoryObj } from "@storybook/react";

import { completeChartShellVariants } from "../stories/complete-chart-story-shared";
import { BubbleChart } from "./bubble-chart";
import { bubblePointLabelSeries } from "./bubble-chart-story-data";

const BubbleChartCompletePointLabelsReferenceLinesDemo = () => (
  <div className={completeChartShellVariants()}>
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
  component: BubbleChart,
  tags: ["autodocs"],
  title: "Components/Chart Complete/Bubble/PointLabelsReferenceLines",
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
