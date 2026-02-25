import type { Meta, StoryObj } from "@storybook/react";

import { useState } from "react";

import { Button } from "../../button/button";
import { Input } from "../../input/input";
import {
  Popover,
  PopoverArrow,
  PopoverPopup,
  PopoverPortal,
  PopoverPositioner,
  PopoverTrigger,
  PopoverViewport,
} from "../popover";

const sizeOptions = ["xs", "sm", "md", "lg", "xl"] as const;

export const baseMeta = {
  title: "Components/Popover",
  component: Popover,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    size: {
      control: "select",
      options: sizeOptions,
    },
  },
  subcomponents: {
    PopoverTrigger,
    PopoverPortal,
    PopoverPositioner,
    PopoverPopup,
    PopoverArrow,
    PopoverViewport,
  },
} satisfies Meta<typeof Popover>;

type Story = StoryObj<typeof baseMeta>;

export const Default: Story = {
  args: {
    size: "md",
  },
  render: (args) => (
    <Popover size={args.size}>
      <Popover.Trigger render={<Button variant="outline" />}>
        View quota status
      </Popover.Trigger>
      <Popover.Content>
        <Popover.Header>
          <Popover.Title>Usage summary</Popover.Title>
          <Popover.Description>
            Workspace usage is at 82% of monthly compute quota.
          </Popover.Description>
        </Popover.Header>
      </Popover.Content>
    </Popover>
  ),
};

export const ComposedAnatomy: Story = {
  render: () => (
    <Popover>
      <Popover.Trigger render={<Button variant="outline" />}>
        Open escalation actions
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Positioner sideOffset={8}>
          <Popover.Popup>
            <Popover.Arrow />
            <Popover.Viewport>
              <Popover.Header>
                <Popover.Title>Escalation options</Popover.Title>
                <Popover.Description>
                  Route this incident to platform engineering or customer
                  success.
                </Popover.Description>
              </Popover.Header>
              <Popover.Close render={<Button size="sm" variant="outline" />}>
                Close
              </Popover.Close>
            </Popover.Viewport>
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      {sizeOptions.map((size) => (
        <Popover key={size} size={size}>
          <Popover.Trigger render={<Button size="sm" variant="outline" />}>
            Alert {size.toUpperCase()}
          </Popover.Trigger>
          <Popover.Content>
            <Popover.Header>
              <Popover.Title>{`${size.toUpperCase()} escalation note`}</Popover.Title>
              <Popover.Description>
                Check spacing for <code>{`size="${size}"`}</code> when showing
                policy hints inline.
              </Popover.Description>
            </Popover.Header>
          </Popover.Content>
        </Popover>
      ))}
    </div>
  ),
};

export const SizeOverrides: Story = {
  render: () => (
    <div className="flex flex-wrap items-start gap-4">
      <Popover size="xs">
        <Popover.Trigger render={<Button variant="outline" />}>
          Root XS
        </Popover.Trigger>
        <Popover.Content>
          <Popover.Header>
            <Popover.Title>Compact policy hint</Popover.Title>
            <Popover.Description>
              This content inherits root size for condensed layout.
            </Popover.Description>
          </Popover.Header>
        </Popover.Content>
      </Popover>

      <Popover size="sm">
        <Popover.Trigger render={<Button variant="outline" />}>
          Root SM + Content XL
        </Popover.Trigger>
        <Popover.Content size="xl">
          <Popover.Header>
            <Popover.Title>Expanded review panel</Popover.Title>
            <Popover.Description>
              Content overrides root size to display richer audit guidance.
            </Popover.Description>
          </Popover.Header>
        </Popover.Content>
      </Popover>

      <Popover size="sm">
        <Popover.Trigger render={<Button variant="outline" />}>
          Root SM + Popup XL
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Positioner sideOffset={8}>
            <Popover.Popup size="xl">
              <Popover.Arrow />
              <Popover.Viewport>
                <Popover.Header>
                  <Popover.Title>Popup override</Popover.Title>
                  <Popover.Description>
                    Popup keeps xl density for operations notes while root stays
                    small.
                  </Popover.Description>
                </Popover.Header>
              </Popover.Viewport>
            </Popover.Popup>
          </Popover.Positioner>
        </Popover.Portal>
      </Popover>
    </div>
  ),
};

const ControlledOpenDemo = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col items-start gap-3">
      <div className="text-xs text-muted-foreground">
        State: {open ? "open" : "closed"}
      </div>
      <Popover onOpenChange={setOpen} open={open}>
        <Popover.Trigger render={<Button variant="outline" />}>
          Incident routing
        </Popover.Trigger>
        <Popover.Content>
          <Popover.Header>
            <Popover.Title>Controlled overlay</Popover.Title>
            <Popover.Description>
              Open state is controlled to mirror workflow toggles.
            </Popover.Description>
          </Popover.Header>
          <Popover.Close render={<Button size="sm" variant="outline" />}>
            Close
          </Popover.Close>
        </Popover.Content>
      </Popover>
    </div>
  );
};

export const ControlledOpen: Story = {
  render: () => <ControlledOpenDemo />,
};

export const FormContent: Story = {
  render: () => (
    <Popover defaultOpen size="lg">
      <Popover.Trigger render={<Button variant="outline" />}>
        Edit alert policy
      </Popover.Trigger>
      <Popover.Content sideOffset={8}>
        <Popover.Header>
          <Popover.Title>Policy details</Popover.Title>
          <Popover.Description>
            Update routing metadata used by incident automation.
          </Popover.Description>
        </Popover.Header>
        <div className="grid gap-2">
          <Input aria-label="Policy name" defaultValue="High CPU incidents" />
          <Input
            aria-label="Escalation owner email"
            defaultValue="oncall@acme.io"
          />
        </div>
        <div className="mt-2 flex justify-end gap-2">
          <Popover.Close render={<Button size="sm" variant="outline" />}>
            Cancel
          </Popover.Close>
          <Button size="sm">Save</Button>
        </div>
      </Popover.Content>
    </Popover>
  ),
};
