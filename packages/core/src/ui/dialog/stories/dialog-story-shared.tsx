import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "../../button/button";
import { Input } from "../../input/input";
import { Label } from "../../label/label";
import {
  DialogBackdrop,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogPopup,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
  DialogViewport,
} from "../dialog";

export const baseMeta = {
  component: Dialog,
  parameters: {
    layout: "centered",
  },
  subcomponents: {
    DialogBackdrop,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogPopup,
    DialogPortal,
    DialogTitle,
    DialogTrigger,
    DialogViewport,
  },
  tags: ["autodocs"],
  title: "Components/Dialog",
} satisfies Meta<typeof Dialog>;

type Story = StoryObj<typeof baseMeta>;

export const Default: Story = {
  render: () => (
    <Dialog>
      <Dialog.Trigger render={<Button variant="outline" />}>
        Invite teammate
      </Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>Invite a teammate</Dialog.Title>
          <Dialog.Description>
            Add a teammate to the workspace with access to dashboards and
            deployment history.
          </Dialog.Description>
        </Dialog.Header>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="invite-name">Full name</Label>
            <Input defaultValue="Sofia Park" id="invite-name" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="invite-email">Work email</Label>
            <Input
              defaultValue="sofia@acme.io"
              id="invite-email"
              type="email"
            />
          </div>
        </div>
        <Dialog.Footer>
          <Button>Send invitation</Button>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog>
  ),
};

export const WithCloseFooter: Story = {
  render: () => (
    <Dialog>
      <Dialog.Trigger render={<Button variant="outline" />}>
        Downgrade plan
      </Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>Downgrade to Starter plan?</Dialog.Title>
          <Dialog.Description>
            You&apos;ll lose SSO, advanced retention rules, and audit exports at
            the next billing cycle.
          </Dialog.Description>
        </Dialog.Header>
        <Dialog.Footer showCloseButton>
          <Button variant="danger">Confirm downgrade</Button>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog>
  ),
};

export const WithoutCloseButton: Story = {
  render: () => (
    <Dialog>
      <Dialog.Trigger render={<Button variant="outline" />}>
        Start security checkpoint
      </Dialog.Trigger>
      <Dialog.Content showCloseButton={false}>
        <Dialog.Header>
          <Dialog.Title>Rotate production token</Dialog.Title>
          <Dialog.Description>
            This operation is required before handing off on-call ownership.
          </Dialog.Description>
        </Dialog.Header>
        <Dialog.Footer showCloseButton>
          <Button>Token rotated</Button>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog>
  ),
};

export const ComposedAnatomy: Story = {
  render: () => (
    <Dialog>
      <Dialog.Trigger render={<Button variant="outline" />}>
        Approve feature rollout
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Backdrop />
        <Dialog.Viewport>
          <Dialog.Popup>
            <Dialog.Header>
              <Dialog.Title>Ship rollout to 100% of tenants?</Dialog.Title>
              <Dialog.Description>
                Error rates and latency stayed within SLO targets during staged
                rollout.
              </Dialog.Description>
            </Dialog.Header>
            <Dialog.Footer showCloseButton>
              <Button>Approve rollout</Button>
            </Dialog.Footer>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog>
  ),
};
