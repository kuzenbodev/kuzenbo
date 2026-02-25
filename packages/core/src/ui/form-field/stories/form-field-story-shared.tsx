import type { Meta, StoryObj } from "@storybook/react";

import { Input } from "../../input/input";
import { FormField } from "../form-field";

export const baseMeta = {
  title: "Components/FormField",
  component: FormField,
  tags: ["autodocs"],
} satisfies Meta<typeof FormField>;

type Story = StoryObj<typeof baseMeta>;

export const Default: Story = {
  render: () => (
    <FormField name="companyName">
      <FormField.Label htmlFor="company-name">Company name</FormField.Label>
      <FormField.Content>
        <Input id="company-name" placeholder="Acme Security Platform" />
      </FormField.Content>
    </FormField>
  ),
};

export const WithHelperText: Story = {
  render: () => (
    <FormField name="workspaceSlug">
      <FormField.Label htmlFor="workspace-slug">Workspace slug</FormField.Label>
      <FormField.Content>
        <Input id="workspace-slug" placeholder="acme-enterprise" />
        <FormField.Description>
          Used in admin URLs and SCIM provisioning identifiers.
        </FormField.Description>
      </FormField.Content>
    </FormField>
  ),
};

export const WithError: Story = {
  render: () => (
    <FormField invalid name="invoiceEmail">
      <FormField.Label htmlFor="invoice-email">
        Invoice contact email
      </FormField.Label>
      <FormField.Content>
        <Input
          aria-invalid="true"
          id="invoice-email"
          placeholder="finance@acme.io"
          type="email"
        />
        <FormField.Error>
          Use a valid accounts-payable email address.
        </FormField.Error>
      </FormField.Content>
    </FormField>
  ),
};
