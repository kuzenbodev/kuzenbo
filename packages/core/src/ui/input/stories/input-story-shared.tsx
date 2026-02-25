import type { Meta, StoryObj } from "@storybook/react";

import { InputGroup } from "../../input-group/input-group";
import { Input } from "../input";

const inputSizes = ["xs", "sm", "md", "lg", "xl"] as const;

export const baseMeta = {
  title: "Components/Input",
  component: Input,
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      options: ["text", "email", "password", "number", "search", "tel", "url"],
    },
    placeholder: { control: "text" },
    disabled: { control: "boolean" },
    size: {
      control: "select",
      options: inputSizes,
    },
  },
} satisfies Meta<typeof Input>;

type Story = StoryObj<typeof baseMeta>;

export const Default: Story = {
  args: {
    name: "workspaceName",
    placeholder: "Acme Security Platform",
  },
};

export const Email: Story = {
  args: {
    autoComplete: "email",
    name: "billingContactEmail",
    placeholder: "billing@acme.io",
    type: "email",
  },
};

export const Password: Story = {
  args: {
    autoComplete: "current-password",
    name: "adminPassword",
    placeholder: "Enter admin override password",
    type: "password",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    name: "workspaceSlug",
    readOnly: true,
    value: "acme-enterprise",
  },
};

export const WithValue: Story = {
  args: {
    defaultValue: "PO-2026-0042",
    name: "purchaseOrderCode",
  },
};

export const File: Story = {
  args: {
    "aria-label": "Attach signed master service agreement",
    name: "signedAgreement",
    type: "file",
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="grid gap-2">
      {inputSizes.map((size) => (
        <Input
          aria-label={`${size.toUpperCase()} project code input`}
          key={size}
          placeholder={`${size.toUpperCase()} project code`}
          size={size}
        />
      ))}
    </div>
  ),
};

export const SizePrecedence: Story = {
  render: () => (
    <div className="grid gap-3">
      <InputGroup size="xl">
        <InputGroup.Input placeholder="Inherited xl workspace legal name" />
      </InputGroup>

      <InputGroup size="xl">
        <InputGroup.Input
          placeholder="Child override to sm cost center"
          size="sm"
        />
      </InputGroup>

      <InputGroup size="sm">
        <InputGroup.Input placeholder="Root sm team alias" />
      </InputGroup>
    </div>
  ),
};
