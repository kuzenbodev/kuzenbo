import type { StoryObj } from "@storybook/react";

import { Progress } from "../progress";
import { baseMeta } from "./progress-story-shared";

export default {
  ...baseMeta,
  title: "Components/Progress/WithLabel",
};
type Story = StoryObj<typeof baseMeta>;

export const WithLabel: Story = {
  args: {
    value: 75,
  },
  render: ({ value }) => (
    <div className="w-72 space-y-2">
      <Progress value={value}>
        <div className="flex w-full items-center justify-between gap-3">
          <Progress.Label>Quarterly rollout</Progress.Label>
          <Progress.Value />
        </div>
      </Progress>
      <div className="text-muted-foreground text-sm">
        3 of 4 milestones done.
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Progress with contextual labeling and milestone text for roadmap-style status updates.",
      },
    },
  },
};
