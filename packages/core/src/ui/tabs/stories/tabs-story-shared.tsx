import type { Meta, StoryObj } from "@storybook/react";

import { Tabs } from "../tabs";

const tabVariants = ["default", "line", "pill"] as const;
const tabSizes = ["xs", "sm", "md", "lg", "xl"] as const;
const tabValues = ["overview", "projects", "account"] as const;

type TabVariant = (typeof tabVariants)[number];
type TabSize = (typeof tabSizes)[number];
type TabOrientation = "horizontal" | "vertical";

const TabsCombination = ({
  orientation,
  size,
  variant,
}: {
  variant: TabVariant;
  size: TabSize;
  orientation: TabOrientation;
}) => (
  <Tabs defaultValue={tabValues[0]} orientation={orientation}>
    <Tabs.List size={size} variant={variant}>
      <Tabs.Trigger value={tabValues[0]}>
        {variant}/{size} summary
      </Tabs.Trigger>
      <Tabs.Trigger value={tabValues[1]}>Projects</Tabs.Trigger>
      <Tabs.Trigger value={tabValues[2]}>Account</Tabs.Trigger>
      <Tabs.Indicator />
    </Tabs.List>
    <div className={orientation === "vertical" ? "min-w-0 flex-1" : undefined}>
      <Tabs.Content value={tabValues[0]}>
        Weekly snapshot and trend highlights.
      </Tabs.Content>
      <Tabs.Content value={tabValues[1]}>
        Active projects, due dates, and owners.
      </Tabs.Content>
      <Tabs.Content value={tabValues[2]}>
        Account controls and security settings.
      </Tabs.Content>
    </div>
  </Tabs>
);

export const baseMeta = {
  title: "Components/Tabs",
  component: Tabs,
  tags: ["autodocs"],
} satisfies Meta<typeof Tabs>;

type Story = StoryObj<typeof baseMeta>;

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="overview">
      <Tabs.List activateOnFocus variant="default">
        <Tabs.Trigger value="overview">Overview</Tabs.Trigger>
        <Tabs.Trigger value="projects">Projects</Tabs.Trigger>
        <Tabs.Trigger value="account">Account</Tabs.Trigger>
        <Tabs.Indicator />
      </Tabs.List>
      <Tabs.Content value="overview">
        Performance overview with KPI trends for the current week.
      </Tabs.Content>
      <Tabs.Content value="projects">
        Cross-team project board with due dates and status rollups.
      </Tabs.Content>
      <Tabs.Content value="account">
        Notification preferences, billing contact, and security controls.
      </Tabs.Content>
    </Tabs>
  ),
};

export const Line: Story = {
  render: () => (
    <Tabs defaultValue="projects">
      <Tabs.List activateOnFocus={false} variant="line">
        <Tabs.Trigger value="overview">Overview</Tabs.Trigger>
        <Tabs.Trigger value="projects">Projects</Tabs.Trigger>
        <Tabs.Trigger value="account">Account</Tabs.Trigger>
        <Tabs.Indicator />
      </Tabs.List>
      <Tabs.Content value="overview">
        Manual-activation mode keeps focus navigation separate from selection.
      </Tabs.Content>
      <Tabs.Content value="projects">
        Press Enter or Space on a focused tab to activate it.
      </Tabs.Content>
      <Tabs.Content value="account">
        Useful for keyboard-heavy flows where focus previews should not switch
        context immediately.
      </Tabs.Content>
    </Tabs>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Line tabs in manual activation mode model keyboard workflows where arrow-key focus should not auto-change content.",
      },
    },
  },
};

export const Pill: Story = {
  render: () => (
    <Tabs defaultValue="overview">
      <Tabs.List variant="pill">
        <Tabs.Trigger value="overview">Overview</Tabs.Trigger>
        <Tabs.Trigger disabled value="projects">
          Projects (locked)
        </Tabs.Trigger>
        <Tabs.Trigger value="account">Account</Tabs.Trigger>
        <Tabs.Indicator />
      </Tabs.List>
      <Tabs.Content value="overview">
        Starter plan overview with usage and remaining quota.
      </Tabs.Content>
      <Tabs.Content value="projects">
        Upgrade required to unlock team project management.
      </Tabs.Content>
      <Tabs.Content value="account">
        Billing and upgrade controls for unlocking additional modules.
      </Tabs.Content>
    </Tabs>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Pill tabs demonstrate feature gating with a disabled trigger while still exposing neighboring available sections.",
      },
    },
  },
};

export const FullWidth: Story = {
  render: () => (
    <Tabs defaultValue="overview">
      <Tabs.List fullWidth variant="line">
        <Tabs.Trigger value="overview">Overview</Tabs.Trigger>
        <Tabs.Trigger value="projects">Projects</Tabs.Trigger>
        <Tabs.Trigger value="account">Account</Tabs.Trigger>
        <Tabs.Trigger value="usage">Usage</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="overview">
        Full-width tabs align section navigation across wide card layouts.
      </Tabs.Content>
      <Tabs.Content value="projects">
        Workload split by team with deadlines and current blockers.
      </Tabs.Content>
      <Tabs.Content value="account">
        Team role assignments and workspace-level security policies.
      </Tabs.Content>
      <Tabs.Content value="usage">
        Request volume, storage growth, and seat utilization trend charts.
      </Tabs.Content>
    </Tabs>
  ),
};

export const Vertical: Story = {
  render: () => (
    <Tabs defaultValue="overview" orientation="vertical">
      <Tabs.List variant="default">
        <Tabs.Trigger value="overview">Overview</Tabs.Trigger>
        <Tabs.Trigger value="projects">Projects</Tabs.Trigger>
        <Tabs.Trigger value="account">Account</Tabs.Trigger>
        <Tabs.Indicator />
      </Tabs.List>
      <div className="min-w-0 flex-1">
        <Tabs.Content value="overview">
          Side-aligned navigation keeps dashboard controls visible in admin
          layouts.
        </Tabs.Content>
        <Tabs.Content value="projects">
          Project queue with per-team ownership and priority state.
        </Tabs.Content>
        <Tabs.Content value="account">
          Authentication, API tokens, and team member management.
        </Tabs.Content>
      </div>
    </Tabs>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      {tabSizes.map((size) => (
        <Tabs defaultValue={`overview-${size}`} key={size}>
          <Tabs.List size={size} variant="default">
            <Tabs.Trigger value={`overview-${size}`}>
              {size.toUpperCase()} Overview
            </Tabs.Trigger>
            <Tabs.Trigger value={`projects-${size}`}>Projects</Tabs.Trigger>
            <Tabs.Trigger value={`account-${size}`}>Account</Tabs.Trigger>
            <Tabs.Indicator />
          </Tabs.List>
          <Tabs.Content value={`overview-${size}`}>
            {size.toUpperCase()} density sample for compact and spacious
            layouts.
          </Tabs.Content>
          <Tabs.Content value={`projects-${size}`}>
            {size.toUpperCase()} projects view with consistent trigger spacing.
          </Tabs.Content>
          <Tabs.Content value={`account-${size}`}>
            {size.toUpperCase()} account controls and role configuration.
          </Tabs.Content>
        </Tabs>
      ))}
    </div>
  ),
};

export const AllCombinations: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <div>Horizontal combinations</div>
      <div className="grid gap-4 md:grid-cols-3">
        {tabVariants.flatMap((variant) =>
          tabSizes.map((size) => (
            <TabsCombination
              key={`horizontal-${variant}-${size}`}
              orientation="horizontal"
              size={size}
              variant={variant}
            />
          ))
        )}
      </div>

      <div>Vertical combinations</div>
      <div className="grid gap-4 md:grid-cols-3">
        {tabVariants.flatMap((variant) =>
          tabSizes.map((size) => (
            <TabsCombination
              key={`vertical-${variant}-${size}`}
              orientation="vertical"
              size={size}
              variant={variant}
            />
          ))
        )}
      </div>
    </div>
  ),
};
