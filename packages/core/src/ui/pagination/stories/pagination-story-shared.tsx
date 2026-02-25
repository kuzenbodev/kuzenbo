import type { Meta, StoryObj } from "@storybook/react";

import { Pagination } from "../pagination";

export const baseMeta = {
  title: "Components/Pagination",
  component: Pagination,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "Pagination root and child controls share the unified `UISize` contract (`xs | sm | md | lg | xl`) with child-level overrides.",
      },
    },
  },
} satisfies Meta<typeof Pagination>;

type Story = StoryObj<typeof baseMeta>;

const renderNumberedLink = (page: number, active = false) => (
  <Pagination.Item key={page}>
    <Pagination.Link href={`#page-${page}`} isActive={active} kind="default">
      {page}
    </Pagination.Link>
  </Pagination.Item>
);

export const Default: Story = {
  args: {
    size: "md",
  },
  render: (args) => (
    <Pagination size={args.size}>
      <Pagination.Content>
        <Pagination.Item>
          <Pagination.Previous href="#page-1" />
        </Pagination.Item>
        {renderNumberedLink(1, true)}
        {renderNumberedLink(2)}
        {renderNumberedLink(3)}
        {renderNumberedLink(4)}
        <Pagination.Item>
          <Pagination.Next href="#page-2" />
        </Pagination.Item>
      </Pagination.Content>
    </Pagination>
  ),
};

export const WithEllipsis: Story = {
  args: {
    size: "md",
  },
  render: (args) => (
    <Pagination size={args.size}>
      <Pagination.Content>
        <Pagination.Item>
          <Pagination.Previous href="#page-8" />
        </Pagination.Item>
        {renderNumberedLink(1)}
        <Pagination.Item>
          <Pagination.Ellipsis />
        </Pagination.Item>
        {renderNumberedLink(8)}
        {renderNumberedLink(9, true)}
        {renderNumberedLink(10)}
        <Pagination.Item>
          <Pagination.Ellipsis />
        </Pagination.Item>
        {renderNumberedLink(42)}
        <Pagination.Item>
          <Pagination.Next href="#page-10" />
        </Pagination.Item>
      </Pagination.Content>
    </Pagination>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Represents a deep result set by keeping a focused page window around the active page and collapsing distant ranges.",
      },
    },
  },
};

export const WithBoundaryLinks: Story = {
  args: {
    size: "md",
  },
  render: (args) => (
    <Pagination size={args.size}>
      <Pagination.Content>
        <Pagination.Item>
          <Pagination.Link href="#page-1" kind="default">
            First
          </Pagination.Link>
        </Pagination.Item>
        <Pagination.Item>
          <Pagination.Previous href="#page-5" />
        </Pagination.Item>
        {renderNumberedLink(5)}
        {renderNumberedLink(6, true)}
        {renderNumberedLink(7)}
        <Pagination.Item>
          <Pagination.Next href="#page-7" />
        </Pagination.Item>
        <Pagination.Item>
          <Pagination.Link href="#page-12" kind="default">
            Last
          </Pagination.Link>
        </Pagination.Item>
      </Pagination.Content>
    </Pagination>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Adds explicit first/last boundary navigation for table and inbox views where jumping directly to edge pages is common.",
      },
    },
  },
};
