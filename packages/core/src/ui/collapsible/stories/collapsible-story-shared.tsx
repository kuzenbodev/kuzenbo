import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { Typography } from "../../typography/typography";
import { Collapsible } from "../collapsible";
import type { CollapsibleContentProps, CollapsibleProps } from "../collapsible";

export const baseMeta = {
  component: Collapsible,
  tags: ["autodocs"],
  title: "Components/Collapsible",
} satisfies Meta<typeof Collapsible>;

type Story = StoryObj<typeof baseMeta>;

const renderScenario = ({
  content,
  contentProps,
  rootProps,
  triggerLabel,
}: {
  triggerLabel: string;
  content: string;
  rootProps?: CollapsibleProps;
  contentProps?: CollapsibleContentProps;
}) => (
  <Collapsible
    className="border-border bg-background w-96 rounded-md border p-4"
    {...rootProps}
  >
    <Collapsible.Trigger className="border-border bg-background inline-flex items-center rounded-md border px-3 py-1.5">
      <Typography.Text render={<span />}>{triggerLabel}</Typography.Text>
    </Collapsible.Trigger>
    <Collapsible.Content className="pt-2" {...contentProps}>
      <Typography.Body>{content}</Typography.Body>
    </Collapsible.Content>
  </Collapsible>
);

export const Default: Story = {
  render: () =>
    renderScenario({
      content:
        "Version 1.8.0 ships new pagination variants, tooltip size overrides, and updated docs examples.",
      triggerLabel: "Release notes",
    }),
};

export const DefaultOpen: Story = {
  render: () =>
    renderScenario({
      content:
        "Connect the repository, configure CI secrets, and run the initial release dry-run before inviting collaborators.",
      rootProps: {
        defaultOpen: true,
      },
      triggerLabel: "Onboarding checklist",
    }),
};

const ControlledDemo = () => {
  const [open, setOpen] = useState(false);

  return (
    <Collapsible
      className="border-border bg-background w-96 rounded-md border p-4"
      onOpenChange={setOpen}
      open={open}
    >
      <Collapsible.Trigger className="border-border bg-background inline-flex items-center rounded-md border px-3 py-1.5">
        <Typography.Text render={<span />}>
          {open ? "Hide incident details" : "Show incident details"}
        </Typography.Text>
      </Collapsible.Trigger>
      <Collapsible.Content className="pt-2">
        <Typography.Body>
          The incident is mitigated. Background jobs are draining and error rate
          has returned to baseline.
        </Typography.Body>
      </Collapsible.Content>
      <Typography.Muted className="pt-2">
        Incident panel state: {open ? "open" : "closed"}
      </Typography.Muted>
    </Collapsible>
  );
};

export const Controlled: Story = {
  render: () => <ControlledDemo />,
};

export const Disabled: Story = {
  render: () =>
    renderScenario({
      content:
        "This section is unavailable until billing ownership is transferred to an administrator.",
      rootProps: {
        disabled: true,
      },
      triggerLabel: "Billing lock notice",
    }),
};

export const KeepMounted: Story = {
  render: () =>
    renderScenario({
      content:
        "The form draft remains mounted while collapsed, preserving unsaved values between toggle events.",
      contentProps: {
        keepMounted: true,
      },
      triggerLabel: "Session draft",
    }),
};

export const HiddenUntilFound: Story = {
  render: () =>
    renderScenario({
      content:
        "Browser find can reveal this panel: kuzenbo-hidden-until-found-token.",
      contentProps: {
        hiddenUntilFound: true,
      },
      triggerLabel: "Searchable troubleshooting note",
    }),
};
