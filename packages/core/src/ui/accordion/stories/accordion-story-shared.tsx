import type { Meta, StoryObj } from "@storybook/react";

import { Accordion } from "../accordion";

export const baseMeta = {
  title: "Components/Accordion",
  component: Accordion,
  tags: ["autodocs"],
} satisfies Meta<typeof Accordion>;

type Story = StoryObj<typeof baseMeta>;

export const Default: Story = {
  render: () => (
    <Accordion className="w-[32rem]" defaultValue={["shipping"]}>
      <Accordion.Item value="shipping">
        <Accordion.Header>
          <Accordion.Trigger>How long does shipping take?</Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Content>
          Most domestic orders arrive in 2-4 business days. Express orders are
          delivered next business day when placed before 3 PM.
        </Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="returns">
        <Accordion.Header>
          <Accordion.Trigger>What is the return window?</Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Content>
          Returns are accepted for 30 days. We generate a prepaid label directly
          from the order portal.
        </Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="support">
        <Accordion.Header>
          <Accordion.Trigger>Where can I contact support?</Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Content>
          Use the in-app help panel to open a ticket. Priority queues route
          enterprise plans to live chat.
        </Accordion.Content>
      </Accordion.Item>
    </Accordion>
  ),
};

export const Bordered: Story = {
  render: () => (
    <Accordion
      className="w-[32rem]"
      defaultValue={["deployments", "permissions"]}
      variant="bordered"
    >
      <Accordion.Item value="deployments">
        <Accordion.Header>
          <Accordion.Trigger>Deployment checklist</Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Content keepMounted>
          Validate environment variables, run smoke tests, and publish release
          notes before promoting to production.
        </Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="permissions">
        <Accordion.Header>
          <Accordion.Trigger>Permissions required</Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Content>
          Release managers need repository write access and organization package
          publish rights.
        </Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="rollback">
        <Accordion.Header>
          <Accordion.Trigger>Rollback strategy</Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Content>
          Use the previous stable tag and run the recovery publish mode to
          restore artifacts safely.
        </Accordion.Content>
      </Accordion.Item>
    </Accordion>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Bordered variant demonstrates dense operations documentation with multiple sections expanded by default and mounted content for fast toggling.",
      },
    },
  },
};

export const Ghost: Story = {
  render: () => (
    <Accordion
      className="w-[32rem]"
      defaultValue={["monitoring"]}
      hiddenUntilFound
      variant="ghost"
    >
      <Accordion.Item value="monitoring">
        <Accordion.Header>
          <Accordion.Trigger>Monitoring signal sources</Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Content>
          We aggregate uptime checks, queue depth alerts, and error budget burn
          rates into a single runbook dashboard.
        </Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="incident-token">
        <Accordion.Header>
          <Accordion.Trigger>Find-in-page resilience</Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Content>
          Browser find can reopen this panel: kuzenbo-accordion-find-token.
        </Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="notifications">
        <Accordion.Header>
          <Accordion.Trigger>Notification routing</Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Content>
          Critical incidents page the on-call engineer. Lower-severity alerts
          are grouped into hourly digests.
        </Accordion.Content>
      </Accordion.Item>
    </Accordion>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Ghost variant highlights lightweight, search-reveal content blocks that blend into documentation-heavy layouts.",
      },
    },
  },
};
