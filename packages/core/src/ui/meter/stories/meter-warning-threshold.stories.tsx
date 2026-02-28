import type { StoryObj } from "@storybook/react";

import { Meter } from "../meter";
import { baseMeta } from "./meter-story-shared";

export default {
  ...baseMeta,
  title: "Components/Meter/WarningThreshold",
};
type Story = StoryObj<typeof baseMeta>;

export const WarningThreshold: Story = {
  args: {
    value: 74,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Warning-threshold meter using low/high/optimum guidance to communicate near-capacity usage.",
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
        Warning zone begins above 70%.
      </div>
    </div>
  ),
};
