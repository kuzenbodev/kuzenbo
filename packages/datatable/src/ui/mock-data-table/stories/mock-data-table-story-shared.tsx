import type { Meta, StoryObj } from "@storybook/react";

import { createMockColumns } from "../../../utils/create-mock-columns/create-mock-columns";
import { MockDataTable } from "../mock-data-table";

const data = [
  { id: "1", label: "Revenue" },
  { id: "2", label: "Sessions" },
];

export const baseMeta = {
  title: "Datatable/MockDataTable",
  component: MockDataTable,
  tags: ["autodocs"],
  args: {
    columns: createMockColumns<(typeof data)[number]>([
      { accessorKey: "label", header: "Metric" },
    ]),
    data,
  },
} satisfies Meta<typeof MockDataTable<(typeof data)[number]>>;

type Story = StoryObj<typeof baseMeta>;

export const Default: Story = {};
