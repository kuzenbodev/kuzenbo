import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "../../button/button";
import { Dialog } from "../../dialog/dialog";
import { Portal } from "../portal";

export const baseMeta = {
  title: "Components/Portal",
  component: Portal,
  tags: ["autodocs"],
  args: {
    children: "Portaled content",
  },
} satisfies Meta<typeof Portal>;

type Story = StoryObj<typeof baseMeta>;

export const Default: Story = {
  render: () => (
    <div className="relative rounded-lg border border-border p-4">
      <div className="text-sm text-muted-foreground">
        Dashboard card stays in document flow while status notifications are
        portaled to the viewport edge.
      </div>
      <Portal>
        <div className="fixed right-4 bottom-4 z-50 rounded-lg border border-border bg-background px-3 py-2 text-sm shadow-lg">
          Invoice export finished for February usage.
        </div>
      </Portal>
    </div>
  ),
};

export const CustomContainer: Story = {
  render: () => (
    <div className="grid gap-4">
      <div className="rounded-lg border border-border p-4 text-sm text-muted-foreground">
        Teams can portal contextual UI into bounded containers instead of
        `document.body`.
      </div>
      <div
        className="relative min-h-[9rem] rounded-lg border border-dashed border-border p-4"
        id="incident-timeline-container"
      >
        <div className="text-sm text-muted-foreground">
          Incident timeline panel container
        </div>
      </div>
      <Portal target="#incident-timeline-container">
        <div className="absolute right-4 bottom-4 rounded-md border border-border bg-background px-3 py-2 text-sm shadow-sm">
          Next status update due in 12 minutes.
        </div>
      </Portal>
    </div>
  ),
};

export const LayeredWithDialog: Story = {
  render: () => (
    <div className="relative min-h-[18rem] rounded-lg border border-border p-4">
      <Dialog defaultOpen>
        <Dialog.Trigger render={<Button variant="outline" />}>
          Review outage postmortem
        </Dialog.Trigger>
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title>Postmortem draft ready</Dialog.Title>
            <Dialog.Description>
              Verify action items before sharing with customer success and
              engineering leadership.
            </Dialog.Description>
          </Dialog.Header>
          <Dialog.Footer>
            <Dialog.Close render={<Button variant="outline" />}>
              Close
            </Dialog.Close>
            <Button>Approve draft</Button>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog>
      <Portal>
        <div className="fixed top-4 left-4 z-50 rounded-md border border-border bg-background px-3 py-2 text-sm shadow-lg">
          Incident bridge remains active for region us-east-1.
        </div>
      </Portal>
    </div>
  ),
};
