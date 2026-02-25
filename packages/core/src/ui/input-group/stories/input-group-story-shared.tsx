import type { Meta, StoryObj } from "@storybook/react";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
} from "../input-group";

export const baseMeta = {
  title: "Components/InputGroup",
  component: InputGroup,
  tags: ["autodocs"],
  subcomponents: {
    InputGroupAddon,
    InputGroupButton,
    InputGroupInput,
    InputGroupText,
  },
  argTypes: {
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
    },
  },
} satisfies Meta<typeof InputGroup>;

type Story = StoryObj<typeof baseMeta>;

export const Default: Story = {
  render: (args) => (
    <InputGroup {...args}>
      <InputGroup.Input placeholder="Search account, invoice, or contract" />
    </InputGroup>
  ),
};

export const WithAddonStart: Story = {
  render: () => (
    <InputGroup>
      <InputGroup.Addon align="inline-start">
        <InputGroup.Text>INV-</InputGroup.Text>
      </InputGroup.Addon>
      <InputGroup.Input placeholder="2026-0042" />
    </InputGroup>
  ),
};

export const WithAddonBothSides: Story = {
  render: () => (
    <InputGroup>
      <InputGroup.Addon align="inline-start">
        <InputGroup.Text>$</InputGroup.Text>
      </InputGroup.Addon>
      <InputGroup.Input placeholder="25000" type="number" />
      <InputGroup.Addon align="inline-end">
        <InputGroup.Text>USD</InputGroup.Text>
      </InputGroup.Addon>
    </InputGroup>
  ),
};

export const WithButton: Story = {
  render: () => (
    <InputGroup>
      <InputGroup.Input placeholder="Paste purchase order number" />
      <InputGroup.Addon align="inline-end">
        <InputGroup.Button>Validate</InputGroup.Button>
      </InputGroup.Addon>
    </InputGroup>
  ),
};

export const Disabled: Story = {
  render: () => (
    <InputGroup data-disabled="true">
      <InputGroup.Addon align="inline-start">
        <InputGroup.Text>Plan</InputGroup.Text>
      </InputGroup.Addon>
      <InputGroup.Input disabled readOnly value="Enterprise Annual" />
    </InputGroup>
  ),
};

const groupSizes = ["xs", "sm", "md", "lg", "xl"] as const;

export const Sizes: Story = {
  render: () => (
    <div className="grid gap-3">
      {groupSizes.map((size) => (
        <InputGroup key={size} size={size}>
          <InputGroup.Addon align="inline-start">
            <InputGroup.Text>Seats</InputGroup.Text>
          </InputGroup.Addon>
          <InputGroup.Input placeholder={`${size.toUpperCase()} seat limit`} />
          <InputGroup.Addon align="inline-end">
            <InputGroup.Button>Save</InputGroup.Button>
          </InputGroup.Addon>
        </InputGroup>
      ))}
    </div>
  ),
};
