import type { Meta, StoryObj } from "@storybook/react";

import { completeChartShellVariants } from "../stories/complete-chart-story-shared";
import { ScatterChart } from "./scatter-chart";
import { scatterDefaultSeries } from "./scatter-chart-story-data";

const ScatterChartCompleteReferenceLinesDemo = () => (
  <div className={completeChartShellVariants()}>
    <ScatterChart
      chartRootProps={{ className: "h-80 w-full" }}
      referenceLines={[
        { color: "var(--color-border)", label: "Impact Goal", y: 70 },
        { color: "var(--color-border)", label: "Effort Guardrail", x: 3.2 },
      ]}
      series={scatterDefaultSeries}
      withLegend
      xKey="effort"
      yKey="impact"
    />
  </div>
);

export default {
  component: ScatterChart,
  tags: ["autodocs"],
  title: "Components/Chart Complete/Scatter/ReferenceLines",
} satisfies Meta<typeof ScatterChart>;

type Story = StoryObj<typeof ScatterChart>;

export const ScatterChartCompleteReferenceLines: Story = {
  args: {
    series: scatterDefaultSeries,
    xKey: "effort",
    yKey: "impact",
  },
  render: () => <ScatterChartCompleteReferenceLinesDemo />,
};
