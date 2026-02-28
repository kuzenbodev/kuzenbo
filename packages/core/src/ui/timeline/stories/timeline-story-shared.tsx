import type { Meta, StoryObj } from "@storybook/react";

import { Timeline } from "../timeline";

const onboardingFlow = [
  {
    description: "Vendor profile and compliance forms were uploaded.",
    id: 0,
    time: "2026-02-18",
    title: "Intake submitted",
  },
  {
    description: "Regional clauses validated by counsel.",
    id: 1,
    time: "2026-02-19",
    title: "Legal review",
  },
  {
    description: "Budget owner approved annual commitment.",
    id: 2,
    time: "2026-02-21",
    title: "Finance approval",
  },
] as const;

const milestoneFlow = [
  {
    description: "Procurement baseline established",
    id: 0,
    time: "2026-01",
    title: "Q1",
  },
  {
    description: "Automated reconciliations launched",
    id: 1,
    time: "2026-04",
    title: "Q2",
  },
  {
    description: "Global policy engine rollout",
    id: 2,
    time: "2026-07",
    title: "Q3",
  },
  {
    description: "Contract intelligence expansion",
    id: 3,
    time: "2026-10",
    title: "Q4",
  },
] as const;

export const baseMeta = {
  component: Timeline,
  tags: ["autodocs"],
  title: "Components/Timeline",
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
