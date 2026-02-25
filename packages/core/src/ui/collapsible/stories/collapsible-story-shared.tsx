import type { Meta, StoryObj } from "@storybook/react";

import { useState } from "react";

import { Typography } from "../../typography/typography";
import {
  Collapsible,
  type CollapsibleContentProps,
  type CollapsibleProps,
} from "../collapsible";

export const baseMeta = {
  title: "Components/Collapsible",
  component: Collapsible,
  tags: ["autodocs"],
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
    className="w-96 rounded-md border border-border bg-background p-4"
    {...rootProps}
  >
    <Collapsible.Trigger className="inline-flex items-center rounded-md border border-border bg-background px-3 py-1.5">
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
      triggerLabel: "Release notes",
      content:
        "Version 1.8.0 ships new pagination variants, tooltip size overrides, and updated docs examples.",
    }),
};

export const DefaultOpen: Story = {
  render: () =>
    renderScenario({
      triggerLabel: "Onboarding checklist",
      content:
        "Connect the repository, configure CI secrets, and run the initial release dry-run before inviting collaborators.",
      rootProps: {
        defaultOpen: true,
      },
    }),
};

const ControlledDemo = () => {
  const [open, setOpen] = useState(false);

  return (
    <Collapsible
      className="w-96 rounded-md border border-border bg-background p-4"
      onOpenChange={setOpen}
      open={open}
    >
      <Collapsible.Trigger className="inline-flex items-center rounded-md border border-border bg-background px-3 py-1.5">
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
      triggerLabel: "Billing lock notice",
      content:
        "This section is unavailable until billing ownership is transferred to an administrator.",
      rootProps: {
        disabled: true,
      },
    }),
};

export const KeepMounted: Story = {
  render: () =>
    renderScenario({
      triggerLabel: "Session draft",
      content:
        "The form draft remains mounted while collapsed, preserving unsaved values between toggle events.",
      contentProps: {
        keepMounted: true,
      },
    }),
};

export const HiddenUntilFound: Story = {
  render: () =>
    renderScenario({
      triggerLabel: "Searchable troubleshooting note",
      content:
        "Browser find can reveal this panel: kuzenbo-hidden-until-found-token.",
      contentProps: {
        hiddenUntilFound: true,
      },
    }),
};
