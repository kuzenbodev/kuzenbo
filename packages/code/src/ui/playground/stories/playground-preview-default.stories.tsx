import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "@kuzenbo/core/ui/button";
import { Typography } from "@kuzenbo/core/ui/typography";
import { cn } from "tailwind-variants";

import { PlaygroundPreview } from "../playground-preview";

type ServiceHealth = "healthy" | "degraded" | "offline";

interface DeploymentPreviewProps {
  serviceName: string;
  region: string;
  health: ServiceHealth;
  showAction: boolean;
}

const DeploymentPreview = ({
  serviceName,
  region,
  health,
  showAction,
}: DeploymentPreviewProps) => (
  <section className="space-y-3 rounded-md border border-border bg-card p-4">
    <div className="flex items-center justify-between gap-3">
      <Typography.Small>{serviceName}</Typography.Small>
      <span
        className={cn(
          "inline-flex items-center rounded-md border px-2 py-0.5 text-xs",
          health === "healthy" &&
            "border-success/30 bg-success/10 text-success",
          health === "degraded" &&
            "border-warning/30 bg-warning/10 text-warning",
          health === "offline" && "border-danger/30 bg-danger/10 text-danger"
        )}
      >
        {health}
      </span>
    </div>
    <Typography.Muted>Serving traffic from {region}</Typography.Muted>
    {showAction ? (
      <Button size="sm" type="button" variant="outline">
        View incident details
      </Button>
    ) : null}
  </section>
);

interface PlaygroundPreviewDemoProps {
  state: {
    health: ServiceHealth;
    region: string;
    showAction: boolean;
  };
  staticProps: {
    serviceName: string;
  };
}

const PlaygroundPreviewDemo = ({
  state,
  staticProps,
}: PlaygroundPreviewDemoProps) => (
  <PlaygroundPreview state={state} staticProps={staticProps}>
    <DeploymentPreview
      health="healthy"
      region="iad1"
      serviceName="Search API"
      showAction
    />
  </PlaygroundPreview>
);

const meta = {
  title: "Code/Playground/PlaygroundPreview/Default",
  component: PlaygroundPreviewDemo,
  tags: ["autodocs"],
  args: {
    staticProps: {
      serviceName: "Search API",
    },
    state: {
      health: "healthy",
      region: "iad1",
      showAction: true,
    },
  },
} satisfies Meta<typeof PlaygroundPreviewDemo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const DegradedWithoutAction: Story = {
  args: {
    state: {
      health: "degraded",
      region: "fra1",
      showAction: false,
    },
  },
};

export const OfflineService: Story = {
  args: {
    state: {
      health: "offline",
      region: "sfo1",
      showAction: true,
    },
    staticProps: {
      serviceName: "Billing Worker",
    },
  },
};
