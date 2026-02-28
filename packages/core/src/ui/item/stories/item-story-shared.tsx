import {
  CheckmarkCircle02Icon,
  Folder01Icon,
  Home01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import type { Meta, StoryObj } from "@storybook/react";

import { Item } from "../item";

const itemSizes = ["xs", "sm", "md", "lg", "xl"] as const;

export const baseMeta = {
  title: "Components/Item",
  component: Item,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: itemSizes,
    },
    variant: {
      control: "select",
      options: ["default", "outline", "muted"],
    },
  },
} satisfies Meta<typeof Item>;

type Story = StoryObj<typeof baseMeta>;

export const Default: Story = {
  render: () => (
    <Item>
      <Item.Header>
        <Item.Title>Workspace summary</Item.Title>
      </Item.Header>
      <Item.Content>
        <Item.Description>
          Review deployment status, incidents, and approval queue.
        </Item.Description>
      </Item.Content>
    </Item>
  ),
};

export const SelectedState: Story = {
  render: () => (
    <Item aria-selected variant="muted">
      <Item.Media variant="icon">
        <HugeiconsIcon icon={CheckmarkCircle02Icon} strokeWidth={2} />
      </Item.Media>
      <Item.Content>
        <Item.Title>Incident triage board</Item.Title>
        <Item.Description>
          Selected in the workspace switcher and ready to open.
        </Item.Description>
      </Item.Content>
      <Item.Actions>
        <span>Current</span>
      </Item.Actions>
    </Item>
  ),
};

export const WithLeadingIcon: Story = {
  render: () => (
    <Item variant="outline">
      <Item.Media variant="icon">
        <HugeiconsIcon icon={Folder01Icon} strokeWidth={2} />
      </Item.Media>
      <Item.Content>
        <Item.Title>Release planning board</Item.Title>
        <Item.Description>
          Backlog grooming, owners, and deployment checklists.
        </Item.Description>
      </Item.Content>
    </Item>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="grid gap-3">
      {itemSizes.map((size) => (
        <Item key={size} size={size} variant="outline">
          <Item.Media variant="icon">
            <HugeiconsIcon icon={Home01Icon} strokeWidth={2} />
          </Item.Media>
          <Item.Content>
            <Item.Title>{size.toUpperCase()} workspace row</Item.Title>
            <Item.Description>
              Padding, icon size, and typography scale with {size}.
            </Item.Description>
          </Item.Content>
        </Item>
      ))}
    </div>
  ),
};
