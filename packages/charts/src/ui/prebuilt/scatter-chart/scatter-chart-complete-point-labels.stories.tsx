import type { Meta, StoryObj } from "@storybook/react";

import {
  completeChartShellVariants,
  formatNumberCompact,
} from "../stories/complete-chart-story-shared";
import { ScatterChart } from "./scatter-chart";
import { scatterPointLabelSeries } from "./scatter-chart-story-data";

const pointLabelFormatter = (value: number) => `Score ${value}`;
const formatValue = (value: number, key: string) =>
  key === "complexity" ? value.toFixed(1) : formatNumberCompact(value);

const ScatterChartCompletePointLabelsDemo = () => (
  <div className={completeChartShellVariants()}>
    <ScatterChart
      chartRootProps={{ className: "h-80 w-full" }}
      pointLabelDataKey="score"
      pointLabelFormatter={pointLabelFormatter}
      series={scatterPointLabelSeries}
      valueFormatter={formatValue}
      withPointLabels
      xKey="complexity"
      yKey="value"
    />
  </div>
);

export default {
  title: "Components/Chart Complete/Scatter/PointLabels",
  component: ScatterChart,
  tags: ["autodocs"],
} satisfies Meta<typeof ScatterChart>;

type Story = StoryObj<typeof ScatterChart>;

export const ScatterChartCompletePointLabels: Story = {
  args: {
    series: scatterPointLabelSeries,
    xKey: "complexity",
    yKey: "value",
  },
  render: () => <ScatterChartCompletePointLabelsDemo />,
};
