import type { StoryObj } from "@storybook/react";

import { Meter } from "../meter";
import { baseMeta } from "./meter-story-shared";

export default {
  ...baseMeta,
  title: "Components/Meter/DangerThreshold",
};
type Story = StoryObj<typeof baseMeta>;

export const DangerThreshold: Story = {
  args: {
    value: 96,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Danger-threshold meter for critical saturation levels where action is required immediately.",
      },
    },
  },
  render: ({ value }) => (
    <div className="w-64 space-y-2">
      <Meter max={100} min={0} value={value}>
        <Meter.Label>Cluster memory usage</Meter.Label>
        <Meter.Value />
      </Meter>
      <div className="text-muted-foreground text-sm">
        Critical threshold exceeded above 85%.
      </div>
    </div>
  ),
};
