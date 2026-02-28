import type { Meta, StoryObj } from "@storybook/react";

import { ResizablePanelGroup } from "../resizable";

export const baseMeta = {
  component: ResizablePanelGroup,
  tags: ["autodocs"],
  title: "Components/Resizable",
} satisfies Meta<typeof ResizablePanelGroup>;

type Story = StoryObj<typeof baseMeta>;

export const Default: Story = {
  render: () => (
    <ResizablePanelGroup className="border-border bg-card h-48 max-w-2xl rounded-md border">
      <ResizablePanelGroup.Panel defaultSize={55}>
        <div className="grid h-full gap-1 p-4 text-sm">
          <div className="font-medium">Approval timeline</div>
          <div className="text-muted-foreground">
            14 requests are ready for same-day finance validation.
          </div>
        </div>
      </ResizablePanelGroup.Panel>
      <ResizablePanelGroup.Handle withHandle />
      <ResizablePanelGroup.Panel defaultSize={45}>
        <div className="grid h-full gap-1 p-4 text-sm">
          <div className="font-medium">Escalation queue</div>
          <div className="text-muted-foreground">
            3 contracts are blocked by regional compliance checks.
          </div>
        </div>
      </ResizablePanelGroup.Panel>
    </ResizablePanelGroup>
  ),
};

export const MinMaxConstraints: Story = {
  render: () => (
    <ResizablePanelGroup className="border-border bg-card h-52 max-w-3xl rounded-md border">
      <ResizablePanelGroup.Panel defaultSize={30} maxSize={45} minSize={20}>
        <div className="p-4 text-sm">
          <div className="font-medium">Accounts</div>
          <div className="text-muted-foreground">
            Fixed-width navigation rail
          </div>
        </div>
      </ResizablePanelGroup.Panel>
      <ResizablePanelGroup.Handle withHandle />
      <ResizablePanelGroup.Panel defaultSize={45} minSize={30}>
        <div className="p-4 text-sm">
          <div className="font-medium">Approval workspace</div>
          <div className="text-muted-foreground">
            Drag handles while maintaining min and max panel limits.
          </div>
        </div>
      </ResizablePanelGroup.Panel>
      <ResizablePanelGroup.Handle withHandle />
      <ResizablePanelGroup.Panel defaultSize={25} maxSize={35} minSize={15}>
        <div className="p-4 text-sm">
          <div className="font-medium">Audit notes</div>
          <div className="text-muted-foreground">
            Context panel for reviewers
          </div>
        </div>
      </ResizablePanelGroup.Panel>
    </ResizablePanelGroup>
  ),
};

export const VerticalPanels: Story = {
  render: () => (
    <ResizablePanelGroup className="border-border bg-card h-72 max-w-xl rounded-md border">
      <ResizablePanelGroup.Panel defaultSize={55} minSize={35}>
        <div className="grid h-full gap-1 p-4 text-sm">
          <div className="font-medium">Morning standup notes</div>
          <div className="text-muted-foreground">
            Vendor incidents, release blockers, and SLA highlights.
          </div>
        </div>
      </ResizablePanelGroup.Panel>
      <ResizablePanelGroup.Handle withHandle />
      <ResizablePanelGroup.Panel defaultSize={45} minSize={25}>
        <div className="grid h-full gap-1 p-4 text-sm">
          <div className="font-medium">Action items</div>
          <div className="text-muted-foreground">
            Owners and due dates for unresolved approvals.
          </div>
        </div>
      </ResizablePanelGroup.Panel>
    </ResizablePanelGroup>
  ),
};
