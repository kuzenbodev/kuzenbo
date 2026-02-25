import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "../../button/button";
import { Field } from "../../field/field";
import { Form } from "../form";

const workspaceNameValidation = (value: unknown) => {
  if (typeof value !== "string" || value.trim().length < 3) {
    return "Workspace name must be at least 3 characters";
  }

  return null;
};

const adminEmailValidation = (value: unknown) => {
  if (typeof value !== "string" || !value.includes("@")) {
    return "Enter a valid admin email";
  }

  return null;
};

const seatLimitValidation = (value: unknown) => {
  const seatLimit = Number(value);

  if (!Number.isFinite(seatLimit) || seatLimit <= 0) {
    return "Seat limit must be a positive number";
  }

  return null;
};

export const baseMeta = {
  title: "Components/Form",
  component: Form,
  tags: ["autodocs"],
} satisfies Meta<typeof Form>;

type Story = StoryObj<typeof baseMeta>;

export const Default: Story = {
  render: () => (
    <Form>
      <Field name="workspaceName" validate={workspaceNameValidation}>
        <Field.Label htmlFor="workspace-name">Workspace name</Field.Label>
        <Field.Control
          id="workspace-name"
          placeholder="Acme Security Platform"
        />
        <Field.Error />
      </Field>
      <Field name="adminEmail" validate={adminEmailValidation}>
        <Field.Label htmlFor="admin-email">Admin email</Field.Label>
        <Field.Control
          id="admin-email"
          placeholder="admin@acme.io"
          type="email"
        />
        <Field.Description>
          We&apos;ll send setup checklists and SSO instructions to this inbox.
        </Field.Description>
        <Field.Error />
      </Field>
      <Field name="seatLimit" validate={seatLimitValidation}>
        <Field.Label htmlFor="seat-limit">Initial seat limit</Field.Label>
        <Field.Control id="seat-limit" inputMode="numeric" placeholder="250" />
        <Field.Description>
          Adjust this later under Billing &gt; Seats.
        </Field.Description>
        <Field.Error />
      </Field>
      <Button type="submit">Create workspace</Button>
    </Form>
  ),
};
