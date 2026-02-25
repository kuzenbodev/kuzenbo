import type { StoryObj } from "@storybook/react";

import { Progress } from "../progress";
import { baseMeta } from "./progress-story-shared";

export default {
  ...baseMeta,
  title: "Components/Progress/Indeterminate",
};
type Story = StoryObj<typeof baseMeta>;

export const Indeterminate: Story = {
  args: {
    value: null,
  },
  render: ({ value }) => (
    <div className="w-72 space-y-2">
      <Progress value={value}>
        <div className="flex w-full items-center justify-between gap-3">
          <Progress.Label>Syncing project data</Progress.Label>
          <Progress.Value />
        </div>
      </Progress>
      <div className="text-muted-foreground text-sm">
        Indeterminate progress while server-side indexing is still running.
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Indeterminate progress state for long-running background tasks without a known completion percentage.",
      },
    },
  },
};
