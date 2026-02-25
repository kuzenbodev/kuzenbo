import type { Meta, StoryObj } from "@storybook/react";

import {
  completeChartShellClassName,
  formatNumberCompact,
} from "../stories/complete-chart-story-shared";
import { LineChart } from "./line-chart";
import {
  lineCampaignVsTargetData,
  lineCampaignVsTargetSeries,
} from "./line-chart-story-data";

const formatCampaignValue = (value: number) => formatNumberCompact(value);
const campaignLineProps = (seriesItem: { key?: string; name?: string }) => ({
  strokeOpacity:
    (seriesItem.name ?? seriesItem.key) === "targetReach" ? 0.9 : 1,
});

const LineChartCompleteCampaignVsTargetDemo = () => (
  <div className={completeChartShellClassName}>
    <LineChart
      lineChartProps={{ margin: { top: 12, right: 12, left: 4, bottom: 0 } }}
      chartRootProps={{ className: "h-80 w-full" }}
      curveType="linear"
      data={lineCampaignVsTargetData}
      dataKey="week"
      dotProps={{ r: 4, strokeWidth: 1 }}
      activeDotProps={{ r: 6 }}
      gridProps={{ vertical: false }}
      lineProps={campaignLineProps}
      series={lineCampaignVsTargetSeries}
      strokeWidth={3}
      valueFormatter={formatCampaignValue}
      withDots
      withLegend
      xAxisProps={{ interval: 0 }}
      yAxisProps={{ width: 56 }}
    />
  </div>
);

export default {
  title: "Components/Chart Complete/Line/CampaignVsTarget",
  component: LineChart,
  tags: ["autodocs"],
} satisfies Meta<typeof LineChart>;

type Story = StoryObj<typeof LineChart>;

export const LineChartCompleteCampaignVsTarget: Story = {
  args: {
    data: lineCampaignVsTargetData,
    dataKey: "week",
    series: lineCampaignVsTargetSeries,
  },
  render: () => <LineChartCompleteCampaignVsTargetDemo />,
};
