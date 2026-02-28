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
    <div className="border-border relative rounded-lg border p-4">
      <div className="text-muted-foreground text-sm">
        Dashboard card stays in document flow while status notifications are
        portaled to the viewport edge.
      </div>
      <Portal>
        <div className="z-overlay border-border bg-background fixed right-4 bottom-4 rounded-lg border px-3 py-2 text-sm shadow-lg">
          Invoice export finished for February usage.
        </div>
      </Portal>
    </div>
  ),
};

export const CustomContainer: Story = {
  render: () => (
    <div className="grid gap-4">
      <div className="border-border text-muted-foreground rounded-lg border p-4 text-sm">
        Teams can portal contextual UI into bounded containers instead of
        `document.body`.
      </div>
      <div
        className="border-border relative min-h-[9rem] rounded-lg border border-dashed p-4"
        id="incident-timeline-container"
      >
        <div className="text-muted-foreground text-sm">
          Incident timeline panel container
        </div>
      </div>
      <Portal target="#incident-timeline-container">
        <div className="border-border bg-background absolute right-4 bottom-4 rounded-md border px-3 py-2 text-sm shadow-sm">
          Next status update due in 12 minutes.
        </div>
      </Portal>
    </div>
  ),
};

export const LayeredWithDialog: Story = {
  render: () => (
    <div className="border-border relative min-h-[18rem] rounded-lg border p-4">
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
        <div className="z-overlay border-border bg-background fixed top-4 left-4 rounded-md border px-3 py-2 text-sm shadow-lg">
          Incident bridge remains active for region us-east-1.
        </div>
      </Portal>
    </div>
  ),
};
