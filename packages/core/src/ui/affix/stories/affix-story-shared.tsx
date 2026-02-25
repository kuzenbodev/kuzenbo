import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "../../button/button";
import { Affix } from "../affix";

export const baseMeta = {
  title: "Components/Affix",
  component: Affix,
  tags: ["autodocs"],
} satisfies Meta<typeof Affix>;

type Story = StoryObj<typeof baseMeta>;

export const Default: Story = {
  args: {
    withinPortal: false,
    position: { bottom: 16, right: 16 },
  },
  render: (args) => (
    <div className="relative h-80 w-full overflow-hidden rounded-md border border-border bg-background p-4">
      <div className="grid gap-3">
        <div className="text-sm font-medium">Vendor Operations Console</div>
        <div className="text-sm text-muted-foreground">
          3 purchase orders are waiting for escalation before the daily cutoff.
        </div>
        <div className="grid gap-2 rounded-md border border-border bg-card p-3 text-sm">
          <div className="flex items-center justify-between">
            <span>PO-48213</span>
            <span className="text-muted-foreground">48 min overdue</span>
          </div>
          <div className="flex items-center justify-between">
            <span>PO-48217</span>
            <span className="text-muted-foreground">Legal review pending</span>
          </div>
          <div className="flex items-center justify-between">
            <span>PO-48229</span>
            <span className="text-muted-foreground">
              Budget owner unavailable
            </span>
          </div>
        </div>
      </div>
      <Affix {...args}>
        <Button size="sm">Escalate blocked orders</Button>
      </Affix>
    </div>
  ),
};

export const ResponsiveBottom: Story = {
  args: {
    withinPortal: false,
    position: { bottom: 16, left: 16, right: 16 },
  },
  render: (args) => (
    <div className="relative h-80 w-full overflow-hidden rounded-md border border-border bg-background p-4">
      <div className="grid gap-3">
        <div className="text-sm font-medium">Approvals Inbox</div>
        <div className="text-sm text-muted-foreground">
          Procurement managers can approve from mobile without opening each row.
        </div>
        <div className="rounded-md border border-border bg-card p-3 text-sm text-muted-foreground">
          12 approvals are due in the next two hours.
        </div>
      </div>
      <Affix {...args}>
        <Button className="w-full" size="sm">
          Approve all ready requests
        </Button>
      </Affix>
    </div>
  ),
};

export const StickyWithHeader: Story = {
  args: {
    withinPortal: false,
    position: { top: 72, right: 16 },
  },
  render: (args) => (
    <div className="relative h-96 w-full overflow-hidden rounded-md border border-border bg-background">
      <div className="sticky top-0 border-b border-border bg-card px-4 py-3 text-sm font-medium">
        Contract Clause Review
      </div>
      <div className="grid gap-3 p-4 text-sm">
        <p className="text-muted-foreground">
          Scroll the draft while keeping an escalation action pinned below the
          sticky header.
        </p>
        <p>
          Payment terms remain unresolved for APAC rollout and require finance
          sign-off.
        </p>
        <p>
          Renewal clause language has been updated to match the annual framework
          agreement.
        </p>
        <p>
          Data-processing addendum is complete, but regional annexes are still
          in legal validation.
        </p>
      </div>
      <Affix {...args}>
        <Button size="sm" variant="outline">
          Jump to unresolved clauses
        </Button>
      </Affix>
    </div>
  ),
};
