import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "../../button/button";
import {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipPopup,
  TooltipPortal,
  TooltipPositioner,
  TooltipTrigger,
  TooltipViewport,
} from "../tooltip";

const sizeOptions = ["xs", "sm", "md", "lg", "xl"] as const;

export const baseMeta = {
  argTypes: {
    size: {
      control: "select",
      options: sizeOptions,
    },
  },
  component: Tooltip,
  parameters: {
    layout: "centered",
  },
  subcomponents: {
    TooltipArrow,
    TooltipContent,
    TooltipPopup,
    TooltipPortal,
    TooltipPositioner,
    TooltipTrigger,
    TooltipViewport,
  },
  tags: ["autodocs"],
  title: "Components/Tooltip",
} satisfies Meta<typeof Tooltip>;

type Story = StoryObj<typeof baseMeta>;

export const Default: Story = {
  args: {
    size: "md",
  },
  render: (args) => (
    <Tooltip size={args.size}>
      <Tooltip.Trigger render={<Button variant="outline" />}>
        Copy API key
      </Tooltip.Trigger>
      <Tooltip.Content>Copied to clipboard</Tooltip.Content>
    </Tooltip>
  ),
};

export const Sides: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates placement tradeoffs for dense UIs where surrounding layout constraints determine tooltip side choice.",
      },
    },
  },
  render: () => (
    <div className="grid grid-cols-2 gap-4">
      <Tooltip>
        <Tooltip.Trigger render={<Button variant="outline" />}>
          Top
        </Tooltip.Trigger>
        <Tooltip.Content side="top">
          Runs above compact table controls.
        </Tooltip.Content>
      </Tooltip>
      <Tooltip>
        <Tooltip.Trigger render={<Button variant="outline" />}>
          Bottom
        </Tooltip.Trigger>
        <Tooltip.Content side="bottom">
          Useful when headers already occupy top space.
        </Tooltip.Content>
      </Tooltip>
      <Tooltip>
        <Tooltip.Trigger render={<Button variant="outline" />}>
          Left
        </Tooltip.Trigger>
        <Tooltip.Content side="left">
          Aligns with controls near the right viewport edge.
        </Tooltip.Content>
      </Tooltip>
      <Tooltip>
        <Tooltip.Trigger render={<Button variant="outline" />}>
          Right
        </Tooltip.Trigger>
        <Tooltip.Content side="right">
          Avoids overlaying navigation rails on the left.
        </Tooltip.Content>
      </Tooltip>
    </div>
  ),
};

export const ComposedAnatomy: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Uses Trigger, Portal, Positioner, Popup, Viewport, and Arrow directly for low-level tooltip composition.",
      },
    },
  },
  render: () => (
    <Tooltip defaultOpen>
      <Tooltip.Trigger render={<Button variant="outline" />}>
        Custom tooltip shell
      </Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Positioner side="top" sideOffset={8}>
          <Tooltip.Popup>
            <Tooltip.Viewport>
              Built from canonical tooltip parts.
            </Tooltip.Viewport>
            <Tooltip.Arrow />
          </Tooltip.Popup>
        </Tooltip.Positioner>
      </Tooltip.Portal>
    </Tooltip>
  ),
};

export const SizeOverrides: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Tooltip defaultOpen size="xs">
        <Tooltip.Trigger render={<Button variant="outline" />}>
          Compact root
        </Tooltip.Trigger>
        <Tooltip.Content>Inherits xs size.</Tooltip.Content>
      </Tooltip>

      <Tooltip defaultOpen size="sm">
        <Tooltip.Trigger render={<Button variant="outline" />}>
          Content override
        </Tooltip.Trigger>
        <Tooltip.Content size="xl">Overrides to xl size.</Tooltip.Content>
      </Tooltip>

      <Tooltip defaultOpen size="sm">
        <Tooltip.Trigger render={<Button variant="outline" />}>
          Popup override
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Positioner side="top" sideOffset={8}>
            <Tooltip.Popup size="xl">
              <Tooltip.Viewport>Popup override to xl size.</Tooltip.Viewport>
              <Tooltip.Arrow />
            </Tooltip.Popup>
          </Tooltip.Positioner>
        </Tooltip.Portal>
      </Tooltip>
    </div>
  ),
};

export const SizeScale: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      {sizeOptions.map((size) => (
        <Tooltip key={size} size={size}>
          <Tooltip.Trigger render={<Button size="sm" variant="outline" />}>
            {size.toUpperCase()}
          </Tooltip.Trigger>
          <Tooltip.Content>{`size="${size}" tooltip`}</Tooltip.Content>
        </Tooltip>
      ))}
    </div>
  ),
};
