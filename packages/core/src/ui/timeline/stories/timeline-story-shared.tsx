import type { Meta, StoryObj } from "@storybook/react";

import { Timeline } from "../timeline";

const onboardingFlow = [
  {
    id: 0,
    title: "Intake submitted",
    time: "2026-02-18",
    description: "Vendor profile and compliance forms were uploaded.",
  },
  {
    id: 1,
    title: "Legal review",
    time: "2026-02-19",
    description: "Regional clauses validated by counsel.",
  },
  {
    id: 2,
    title: "Finance approval",
    time: "2026-02-21",
    description: "Budget owner approved annual commitment.",
  },
] as const;

const milestoneFlow = [
  {
    id: 0,
    title: "Q1",
    time: "2026-01",
    description: "Procurement baseline established",
  },
  {
    id: 1,
    title: "Q2",
    time: "2026-04",
    description: "Automated reconciliations launched",
  },
  {
    id: 2,
    title: "Q3",
    time: "2026-07",
    description: "Global policy engine rollout",
  },
  {
    id: 3,
    title: "Q4",
    time: "2026-10",
    description: "Contract intelligence expansion",
  },
] as const;

export const baseMeta = {
  title: "Components/Timeline",
  component: Timeline,
  tags: ["autodocs"],
} satisfies Meta<typeof Timeline>;

type Story = StoryObj<typeof baseMeta>;

export const Default: Story = {
  render: () => (
    <Timeline activeIndex={1}>
      {onboardingFlow.map((item) => (
        <Timeline.Item index={item.id} key={item.id}>
          <Timeline.Dot />
          <Timeline.Connector />
          <Timeline.Header>
            <Timeline.Title>{item.title}</Timeline.Title>
            <Timeline.Time>{item.time}</Timeline.Time>
          </Timeline.Header>
          <Timeline.Content>
            <Timeline.Description>{item.description}</Timeline.Description>
          </Timeline.Content>
        </Timeline.Item>
      ))}
    </Timeline>
  ),
};

export const CurrentStep: Story = {
  render: () => (
    <Timeline activeIndex={2}>
      {onboardingFlow.map((item) => (
        <Timeline.Item index={item.id} key={`current-${item.id}`}>
          <Timeline.Dot />
          <Timeline.Connector />
          <Timeline.Header>
            <Timeline.Title>{item.title}</Timeline.Title>
            <Timeline.Time>{item.time}</Timeline.Time>
          </Timeline.Header>
          <Timeline.Content>
            <Timeline.Description>{item.description}</Timeline.Description>
          </Timeline.Content>
        </Timeline.Item>
      ))}
    </Timeline>
  ),
};

export const Milestones: Story = {
  render: () => (
    <Timeline activeIndex={2} className="w-[640px]" variant="alternate">
      {milestoneFlow.map((item) => (
        <Timeline.Item index={item.id} key={item.id}>
          <Timeline.Dot />
          <Timeline.Connector />
          <Timeline.Header>
            <Timeline.Title>{item.title}</Timeline.Title>
            <Timeline.Time>{item.time}</Timeline.Time>
          </Timeline.Header>
          <Timeline.Content>
            <Timeline.Description>{item.description}</Timeline.Description>
          </Timeline.Content>
        </Timeline.Item>
      ))}
    </Timeline>
  ),
};
