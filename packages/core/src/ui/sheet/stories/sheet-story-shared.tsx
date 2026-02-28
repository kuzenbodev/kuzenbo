import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "../../button/button";
import { Input } from "../../input/input";
import { Label } from "../../label/label";
import {
  Sheet,
  SheetBackdrop,
  SheetPopup,
  SheetPortal,
  SheetTrigger,
  SheetViewport,
} from "../sheet";

export const baseMeta = {
  title: "Components/Sheet",
  component: Sheet,
  tags: ["autodocs"],
  subcomponents: {
    SheetTrigger,
    SheetPortal,
    SheetBackdrop,
    SheetViewport,
    SheetPopup,
  },
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Sheet>;

type Story = StoryObj<typeof baseMeta>;

export const Default: Story = {
  render: () => (
    <Sheet>
      <Sheet.Trigger render={<Button variant="outline" />}>
        Open customer profile
      </Sheet.Trigger>
      <Sheet.Content side="right">
        <Sheet.Header>
          <Sheet.Title>Customer profile</Sheet.Title>
          <Sheet.Description>
            Review lifecycle details before escalating an enterprise support
            ticket.
          </Sheet.Description>
        </Sheet.Header>
        <div className="grid gap-2 px-4 pb-2 text-sm">
          <div className="border-border rounded-md border p-3">
            Plan: Enterprise
          </div>
          <div className="border-border rounded-md border p-3">
            Renewal date: Jul 12, 2026
          </div>
          <div className="border-border rounded-md border p-3">
            Health score: 89/100
          </div>
        </div>
        <Sheet.Footer>
          <Sheet.Close render={<Button variant="outline" />}>Close</Sheet.Close>
          <Button>Escalate case</Button>
        </Sheet.Footer>
      </Sheet.Content>
    </Sheet>
  ),
};

export const ComposedAnatomy: Story = {
  render: () => (
    <Sheet>
      <Sheet.Trigger render={<Button variant="outline" />}>
        Open billing context
      </Sheet.Trigger>
      <Sheet.Portal>
        <Sheet.Backdrop />
        <Sheet.Viewport>
          <Sheet.Popup side="right">
            <Sheet.Header>
              <Sheet.Title>Billing context panel</Sheet.Title>
              <Sheet.Description>
                Validate invoice data and seat changes before finalizing month
                end close.
              </Sheet.Description>
            </Sheet.Header>
            <div className="grid gap-2 px-4 pb-2 text-sm">
              <div className="border-border rounded-md border p-3">
                Pending credits: 3
              </div>
              <div className="border-border rounded-md border p-3">
                Outstanding invoice: $12,480
              </div>
            </div>
            <Sheet.Footer>
              <Sheet.Close render={<Button variant="outline" />}>
                Dismiss
              </Sheet.Close>
              <Button>Finalize review</Button>
            </Sheet.Footer>
          </Sheet.Popup>
        </Sheet.Viewport>
      </Sheet.Portal>
    </Sheet>
  ),
};

export const SideRight: Story = {
  render: () => (
    <Sheet>
      <Sheet.Trigger render={<Button variant="outline" />}>
        Open runbook sidebar
      </Sheet.Trigger>
      <Sheet.Content side="right">
        <Sheet.Header>
          <Sheet.Title>On-call runbook</Sheet.Title>
          <Sheet.Description>
            Follow the incident checklist while the deployment is still in
            progress.
          </Sheet.Description>
        </Sheet.Header>
        <div className="grid gap-2 px-4 pb-2 text-sm">
          <div className="border-border rounded-md border p-3">
            1. Confirm rollout status in control plane.
          </div>
          <div className="border-border rounded-md border p-3">
            2. Notify incident channel and stakeholder group.
          </div>
          <div className="border-border rounded-md border p-3">
            3. Validate error budget after mitigation.
          </div>
        </div>
        <Sheet.Footer>
          <Sheet.Close render={<Button variant="outline" />}>Close</Sheet.Close>
          <Button>Mark complete</Button>
        </Sheet.Footer>
      </Sheet.Content>
    </Sheet>
  ),
};

export const FormContent: Story = {
  render: () => (
    <Sheet>
      <Sheet.Trigger render={<Button variant="outline" />}>
        Edit automation rule
      </Sheet.Trigger>
      <Sheet.Content side="right">
        <Sheet.Header>
          <Sheet.Title>Escalation policy</Sheet.Title>
          <Sheet.Description>
            Update fallback owners and notification channels for production
            incidents.
          </Sheet.Description>
        </Sheet.Header>
        <div className="grid gap-4 px-4 pb-2">
          <div className="grid gap-2">
            <Label htmlFor="escalation-owner">Primary owner</Label>
            <Input defaultValue="sofia@acme.io" id="escalation-owner" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="escalation-slack">Slack channel</Label>
            <Input defaultValue="#incident-response" id="escalation-slack" />
          </div>
        </div>
        <Sheet.Footer>
          <Sheet.Close render={<Button variant="outline" />}>
            Cancel
          </Sheet.Close>
          <Button>Save policy</Button>
        </Sheet.Footer>
      </Sheet.Content>
    </Sheet>
  ),
};
