import type { Meta, StoryObj } from "@storybook/react";

import { Badge } from "../../badge/badge";
import { Marquee } from "../marquee";

const defaultItems = [
  "SLA 99.98%",
  "Queue lag 18s",
  "Incidents 0",
  "Deploy window open",
] as const;

const partnerUpdates = [
  "Northwind: contract signed",
  "Helios Labs: legal review",
  "Everpeak: finance approved",
  "Pioneer Data: onboarding",
] as const;

export const baseMeta = {
  title: "Components/Marquee",
  component: Marquee,
  tags: ["autodocs"],
} satisfies Meta<typeof Marquee>;

type Story = StoryObj<typeof baseMeta>;

export const Default: Story = {
  render: () => (
    <Marquee className="border-border bg-card w-[420px] rounded-md border">
      <Marquee.Content>
        {defaultItems.map((item) => (
          <Marquee.Item key={item}>
            <Badge className="mx-1" variant="secondary">
              {item}
            </Badge>
          </Marquee.Item>
        ))}
      </Marquee.Content>
      <Marquee.Fade side="right" />
    </Marquee>
  ),
};

export const PauseOnHover: Story = {
  render: () => (
    <Marquee className="border-border bg-card w-[420px] rounded-md border">
      <Marquee.Content pauseOnHover speed={40}>
        {partnerUpdates.map((item) => (
          <Marquee.Item key={item}>
            <Badge className="mx-1" variant="outline">
              {item}
            </Badge>
          </Marquee.Item>
        ))}
      </Marquee.Content>
      <Marquee.Fade side="right" />
    </Marquee>
  ),
};

export const ReverseDirection: Story = {
  render: () => (
    <Marquee className="border-border bg-card w-[420px] rounded-md border">
      <Marquee.Content direction="right" speed={36}>
        {defaultItems.map((item) => (
          <Marquee.Item key={`reverse-${item}`}>
            <Badge className="mx-1" variant="secondary">
              {item}
            </Badge>
          </Marquee.Item>
        ))}
      </Marquee.Content>
      <Marquee.Fade side="left" />
    </Marquee>
  ),
};
