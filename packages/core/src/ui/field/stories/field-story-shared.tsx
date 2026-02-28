import type { Meta, StoryObj } from "@storybook/react";

import { Input } from "../../input/input";
import { Field } from "../field";

const fieldSizes = ["xs", "sm", "md", "lg", "xl"] as const;

const validBillingEmail = (value: unknown) => {
  if (typeof value !== "string" || !value.includes("@")) {
    return "Enter a valid billing email";
  }

  return null;
};

export const baseMeta = {
  component: Field,
  tags: ["autodocs"],
  title: "Components/Field",
} satisfies Meta<typeof Field>;

type Story = StoryObj<typeof baseMeta>;

export const Default: Story = {
  render: () => (
    <Field name="billingEmail" validate={validBillingEmail}>
      <Field.Label htmlFor="billing-email">Billing contact email</Field.Label>
      <Field.Control
        id="billing-email"
        placeholder="billing@acme.io"
        type="email"
      />
      <Field.Description>
        Invoices and delinquency notices are sent to this inbox.
      </Field.Description>
      <Field.Error />
      <Field.Validity>
        {(state) =>
          state.validity.valid ? (
            <span className="text-success-foreground text-sm">
              Ready for invoice routing.
            </span>
          ) : null
        }
      </Field.Validity>
    </Field>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="grid w-[360px] gap-4">
      {fieldSizes.map((size) => (
        <Field key={size} name={`approvalCode-${size}`}>
          <Field.Label htmlFor={`approval-code-${size}`}>
            {size.toUpperCase()} approval code
          </Field.Label>
          <Field.Control
            render={
              <Input
                id={`approval-code-${size}`}
                placeholder={`APR-${size.toUpperCase()}-2048`}
                size={size}
              />
            }
          />
          <Field.Description>
            Density and readability scale with the {size} token.
          </Field.Description>
        </Field>
      ))}
    </div>
  ),
};
