import type { Meta, StoryObj } from "@storybook/react";

import { Table } from "../table";

const sizeOptions = ["xs", "sm", "md", "lg", "xl"] as const;

const approvalRows = [
  {
    amount: "$148,200",
    id: "PO-48213",
    owner: "Finance Ops",
    status: "Approved",
  },
  {
    amount: "$72,900",
    id: "PO-48217",
    owner: "Legal",
    status: "Reviewing",
  },
  {
    amount: "$41,360",
    id: "PO-48229",
    owner: "Procurement",
    status: "Escalated",
  },
  {
    amount: "$19,840",
    id: "PO-48235",
    owner: "Security",
    status: "Queued",
  },
] as const;

const denseRows = [
  { id: "REQ-9012", sla: "8h", state: "Completed", team: "APAC" },
  { id: "REQ-9013", sla: "6h", state: "Completed", team: "EMEA" },
  { id: "REQ-9014", sla: "12h", state: "Active", team: "AMER" },
  { id: "REQ-9015", sla: "10h", state: "Active", team: "APAC" },
  { id: "REQ-9016", sla: "24h", state: "Blocked", team: "EMEA" },
  { id: "REQ-9017", sla: "14h", state: "Queued", team: "AMER" },
  { id: "REQ-9018", sla: "18h", state: "Queued", team: "LATAM" },
] as const;

export const baseMeta = {
  argTypes: {
    size: {
      control: "select",
      options: sizeOptions,
    },
  },
  component: Table,
  parameters: {
    docs: {
      description: {
        component:
          "Table surfaces (`header`, `row`, `head`, `cell`, and `caption`) inherit `UISize` from root with per-part override precedence.",
      },
    },
  },
  tags: ["autodocs"],
  title: "Components/Table",
} satisfies Meta<typeof Table>;

type Story = StoryObj<typeof baseMeta>;

export const Default: Story = {
  args: {
    size: "md",
  },
  render: (args) => (
    <Table className="w-full min-w-[640px]" size={args.size}>
      <Table.Caption>Weekly enterprise approval queue</Table.Caption>
      <Table.Header>
        <Table.Row>
          <Table.Head>Request</Table.Head>
          <Table.Head>Owner</Table.Head>
          <Table.Head>Amount</Table.Head>
          <Table.Head>Status</Table.Head>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {approvalRows.map((row) => (
          <Table.Row key={row.id}>
            <Table.Cell className="font-medium">{row.id}</Table.Cell>
            <Table.Cell>{row.owner}</Table.Cell>
            <Table.Cell>{row.amount}</Table.Cell>
            <Table.Cell>{row.status}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  ),
};

export const DenseRows: Story = {
  args: {
    size: "sm",
  },
  render: (args) => (
    <Table className="w-full min-w-[640px]" size={args.size}>
      <Table.Caption>Operational SLA tracker</Table.Caption>
      <Table.Header>
        <Table.Row>
          <Table.Head>Ticket</Table.Head>
          <Table.Head>Region</Table.Head>
          <Table.Head>SLA</Table.Head>
          <Table.Head>State</Table.Head>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {denseRows.map((row) => (
          <Table.Row key={row.id}>
            <Table.Cell className="font-medium">{row.id}</Table.Cell>
            <Table.Cell>{row.team}</Table.Cell>
            <Table.Cell>{row.sla}</Table.Cell>
            <Table.Cell>{row.state}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  ),
};

export const EmptyState: Story = {
  args: {
    size: "md",
  },
  render: (args) => (
    <Table className="w-full min-w-[640px]" size={args.size}>
      <Table.Caption>No pending approvals for this filter set</Table.Caption>
      <Table.Header>
        <Table.Row>
          <Table.Head>Request</Table.Head>
          <Table.Head>Owner</Table.Head>
          <Table.Head>Amount</Table.Head>
          <Table.Head>Status</Table.Head>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        <Table.Row>
          <Table.Cell
            className="text-muted-foreground py-8 text-center"
            colSpan={4}
          >
            All enterprise requests are up to date.
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  ),
};
