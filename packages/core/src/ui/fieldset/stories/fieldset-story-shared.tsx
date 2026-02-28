import type { Meta, StoryObj } from "@storybook/react";

import { Field } from "../../field/field";
import { Fieldset } from "../fieldset";

export const baseMeta = {
  component: Fieldset,
  tags: ["autodocs"],
  title: "Components/Fieldset",
} satisfies Meta<typeof Fieldset>;

type Story = StoryObj<typeof baseMeta>;

export const Default: Story = {
  render: () => (
    <Fieldset>
      <Fieldset.Legend>Incident notification routing</Fieldset.Legend>
      <Field name="primaryOnCallEmail">
        <Field.Label htmlFor="primary-on-call-email">
          Primary on-call email
        </Field.Label>
        <Field.Control
          id="primary-on-call-email"
          placeholder="oncall@acme.io"
          type="email"
        />
        <Field.Description>Receives Sev-1 and Sev-2 alerts.</Field.Description>
      </Field>
      <Field name="secondaryOnCallEmail">
        <Field.Label htmlFor="secondary-on-call-email">
          Secondary on-call email
        </Field.Label>
        <Field.Control
          id="secondary-on-call-email"
          placeholder="backup-oncall@acme.io"
          type="email"
        />
      </Field>
    </Fieldset>
  ),
};
