import type { Meta, StoryObj } from "@storybook/react";

import { ChartProvider } from "../provider/chart-provider";
import { ChartTooltipContent } from "./chart-tooltip-content";

const chartConfig = {
  visits: { color: "var(--color-chart-1)", label: "Visits" },
  revenue: { color: "var(--color-chart-2)", label: "Revenue" },
};

const tooltipPayload = [
  {
    color: "var(--color-chart-1)",
    dataKey: "visits",
    name: "visits",
    payload: { revenue: 4800, visits: 120 },
    type: "line" as const,
    value: 120,
  },
  {
    color: "var(--color-chart-2)",
    dataKey: "revenue",
    name: "revenue",
    payload: { revenue: 4800, visits: 120 },
    type: "line" as const,
    value: 4800,
  },
];

const meta = {
  title: "Charts/Primitives/TooltipContent",
  component: ChartTooltipContent,
  tags: ["autodocs"],
  args: {
    active: true,
    payload: tooltipPayload,
    size: "md",
  },
  argTypes: {
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
    },
    indicator: {
      control: "inline-radio",
      options: ["dot", "line", "dashed"],
    },
  },
  render: (args) => (
    <ChartProvider config={chartConfig}>
      <ChartTooltipContent {...args} />
    </ChartProvider>
  ),
} satisfies Meta<typeof ChartTooltipContent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
