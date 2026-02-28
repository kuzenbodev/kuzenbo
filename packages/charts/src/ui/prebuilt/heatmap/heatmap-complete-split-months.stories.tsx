import type { Meta, StoryObj } from "@storybook/react";

import { completeChartShellVariants } from "../stories/complete-chart-story-shared";
import { Heatmap } from "./heatmap";
import { heatmapReleaseCycleData } from "./heatmap-story-data";

const HeatmapCompleteSplitMonthsDemo = () => (
  <div className={completeChartShellVariants()}>
    <Heatmap
      data={heatmapReleaseCycleData}
      dateKey="date"
      endDate="2026-02-08"
      splitMonths
      startDate="2026-01-27"
      valueKey="value"
      withOutsideDates={false}
    />
  </div>
);

export default {
  component: Heatmap,
  tags: ["autodocs"],
  title: "Components/Chart Complete/Heatmap/Split Months",
} satisfies Meta<typeof Heatmap>;

type Story = StoryObj<typeof Heatmap>;

export const HeatmapCompleteSplitMonths: Story = {
  args: {
    data: heatmapReleaseCycleData,
    dateKey: "date",
    valueKey: "value",
  },
  render: () => <HeatmapCompleteSplitMonthsDemo />,
};
