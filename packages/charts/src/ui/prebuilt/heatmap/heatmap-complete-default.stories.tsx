import type { Meta, StoryObj } from "@storybook/react";

import { completeChartShellClassName } from "../stories/complete-chart-story-shared";
import { Heatmap } from "./heatmap";
import { heatmapQuarterActivityData } from "./heatmap-story-data";

const heatmapTaskValueFormatter = (value: number): string => `${value} tasks`;

const HeatmapCompleteDefaultDemo = () => (
  <div className={completeChartShellClassName}>
    <Heatmap
      data={heatmapQuarterActivityData}
      dateKey="date"
      endDate="2026-03-31"
      startDate="2026-01-01"
      valueFormatter={heatmapTaskValueFormatter}
      valueKey="value"
    />
  </div>
);

export default {
  title: "Components/Chart Complete/Heatmap/Default",
  component: Heatmap,
  tags: ["autodocs"],
} satisfies Meta<typeof Heatmap>;

type Story = StoryObj<typeof Heatmap>;

export const HeatmapCompleteDefault: Story = {
  args: {
    data: heatmapQuarterActivityData,
    dateKey: "date",
    valueKey: "value",
  },
  render: () => <HeatmapCompleteDefaultDemo />,
};
