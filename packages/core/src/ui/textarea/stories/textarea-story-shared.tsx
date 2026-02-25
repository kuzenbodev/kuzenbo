import type { Meta, StoryObj } from "@storybook/react";

import { Textarea } from "../textarea";

export const baseMeta = {
  title: "Components/Textarea",
  component: Textarea,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
    },
  },
} satisfies Meta<typeof Textarea>;

type Story = StoryObj<typeof baseMeta>;

export const Default: Story = {
  args: {
    placeholder:
      "Summarize the rollout impact for customer success and support teams.",
  },
};

export const Disabled: Story = {
  args: {
    defaultValue:
      "Incident timeline is locked after compliance review sign-off.",
    disabled: true,
  },
};

const incidentSummaryValue =
  "Customer reported elevated API latency between 09:10 and 09:42 UTC for EU tenants.";

export const WithCharacterCount: Story = {
  render: () => (
    <div className="grid w-full max-w-lg gap-2">
      <Textarea
        aria-label="Incident summary"
        defaultValue={incidentSummaryValue}
        maxLength={280}
        placeholder="Document customer impact and mitigation actions."
      />
      <span className="text-xs text-muted-foreground">
        {incidentSummaryValue.length}/280 characters
      </span>
    </div>
  ),
};
