import type { Meta, StoryObj } from "@storybook/react";

import { completeChartShellClassName } from "../stories/complete-chart-story-shared";
import { Heatmap, type HeatmapTooltipLabelArgs } from "./heatmap";
import { heatmapQualityData } from "./heatmap-story-data";

const heatmapQualityValueFormatter = (value: number): string => `${value}%`;

const formatHeatmapQualityTooltipValue = (
  value: number | null
): number | string => value ?? "no data";

const heatmapQualityTooltipLabelFormatter = ({
  isoDate,
  value,
}: HeatmapTooltipLabelArgs): string =>
  `${isoDate} • quality ${formatHeatmapQualityTooltipValue(value)}`;

const HeatmapCompleteDomainTooltipDemo = () => (
  <div className={completeChartShellClassName}>
    <Heatmap
      colorDomain={[0, 100]}
      colorRange={[
        "var(--color-muted)",
        "var(--color-chart-5)",
        "var(--color-chart-4)",
        "var(--color-chart-3)",
        "var(--color-chart-1)",
      ]}
      data={heatmapQualityData}
      dateKey="date"
      endDate="2026-01-07"
      startDate="2026-01-01"
      tooltipLabelFormatter={heatmapQualityTooltipLabelFormatter}
      valueFormatter={heatmapQualityValueFormatter}
      valueKey="value"
    />
  </div>
);

export default {
  title: "Components/Chart Complete/Heatmap/Domain And Tooltip",
  component: Heatmap,
  tags: ["autodocs"],
} satisfies Meta<typeof Heatmap>;

type Story = StoryObj<typeof Heatmap>;

export const HeatmapCompleteDomainTooltip: Story = {
  args: {
    data: heatmapQualityData,
    dateKey: "date",
    valueKey: "value",
  },
  render: () => <HeatmapCompleteDomainTooltipDemo />,
};
