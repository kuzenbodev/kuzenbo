import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "../../button/button";
import { Input } from "../../input/input";
import { Label } from "../../label/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../card";

const cardSizes = ["xs", "sm", "md", "lg", "xl"] as const;

export const baseMeta = {
  title: "Components/Card",
  component: Card,
  tags: ["autodocs"],
  subcomponents: {
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
  },
  argTypes: {
    size: {
      control: "select",
      options: cardSizes,
    },
  },
} satisfies Meta<typeof Card>;

type Story = StoryObj<typeof baseMeta>;

export const Default: Story = {
  render: (args) => (
    <Card className="w-[360px]" {...args}>
      <Card.Header>
        <Card.Title>Quarterly renewal pipeline</Card.Title>
        <Card.Description>
          7 enterprise contracts require finance sign-off this week.
        </Card.Description>
      </Card.Header>
      <Card.Content>
        <div className="grid gap-2 text-sm">
          <div className="flex items-center justify-between">
            <span>ARR at risk</span>
            <span className="font-medium">$286K</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Pending approvals</span>
            <span className="font-medium">4</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Owner</span>
            <span className="font-medium">Finance Ops</span>
          </div>
        </div>
      </Card.Content>
      <Card.Footer>
        <Button variant="outline">Export snapshot</Button>
        <Button className="ml-auto">Review blockers</Button>
      </Card.Footer>
    </Card>
  ),
};

export const Small: Story = {
  render: () => (
    <Card className="w-[300px]" size="sm">
      <Card.Header>
        <Card.Title>Incident update</Card.Title>
        <Card.Description>
          Data sync resumed after queue failover.
        </Card.Description>
      </Card.Header>
      <Card.Content>
        <div className="text-sm text-muted-foreground">
          Last retry completed 4 minutes ago.
        </div>
      </Card.Content>
    </Card>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="grid gap-4">
      {cardSizes.map((size) => (
        <Card className="w-[340px]" key={size} size={size}>
          <Card.Header>
            <Card.Title>{size.toUpperCase()} planning card</Card.Title>
            <Card.Description>
              Shared spacing and typography scaling by `size`.
            </Card.Description>
          </Card.Header>
          <Card.Content>
            <div className="text-sm text-muted-foreground">
              Weekly procurement review packet for regional teams.
            </div>
          </Card.Content>
          <Card.Footer>
            <Button size="sm" variant="outline">
              Archive
            </Button>
            <Button className="ml-auto" size="sm">
              Open
            </Button>
          </Card.Footer>
        </Card>
      ))}
    </div>
  ),
};

export const WithForm: Story = {
  render: () => (
    <Card className="w-[360px]">
      <Card.Header>
        <Card.Title>Vendor onboarding request</Card.Title>
        <Card.Description>
          Submit a supplier profile for legal and finance review.
        </Card.Description>
      </Card.Header>
      <Card.Content>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="card-company">Company legal name</Label>
            <Input id="card-company" defaultValue="Northwind Logistics LLC" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="card-contact">Primary finance contact</Label>
            <Input
              id="card-contact"
              defaultValue="billing@northwind.example"
              type="email"
            />
          </div>
        </div>
      </Card.Content>
      <Card.Footer>
        <Button className="w-full">Submit onboarding packet</Button>
      </Card.Footer>
    </Card>
  ),
};

export const ContentOnly: Story = {
  render: () => (
    <Card className="w-[360px]">
      <Card.Content>
        <div className="text-sm">
          Service-level alert: API ingest lag exceeded 90 seconds for two
          regions.
        </div>
      </Card.Content>
    </Card>
  ),
};
