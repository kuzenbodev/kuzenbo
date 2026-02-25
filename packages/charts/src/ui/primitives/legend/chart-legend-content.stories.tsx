import type { Meta, StoryObj } from "@storybook/react";

import { ChartProvider } from "../provider/chart-provider";
import { ChartLegendContent } from "./chart-legend-content";

const chartConfig = {
  visits: { color: "var(--color-chart-1)", label: "Visits" },
  revenue: { color: "var(--color-chart-2)", label: "Revenue" },
};

const legendPayload = [
  {
    color: "var(--color-chart-1)",
    dataKey: "visits",
    type: "line" as const,
    value: "visits",
  },
  {
    color: "var(--color-chart-2)",
    dataKey: "revenue",
    type: "line" as const,
    value: "revenue",
  },
];

const meta = {
  title: "Charts/Primitives/LegendContent",
  component: ChartLegendContent,
  tags: ["autodocs"],
  args: {
    payload: legendPayload,
    size: "md",
    verticalAlign: "bottom",
  },
  argTypes: {
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
    },
    verticalAlign: {
      control: "inline-radio",
      options: ["top", "bottom"],
    },
  },
  render: (args) => (
    <ChartProvider config={chartConfig}>
      <ChartLegendContent {...args} />
    </ChartProvider>
  ),
} satisfies Meta<typeof ChartLegendContent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
