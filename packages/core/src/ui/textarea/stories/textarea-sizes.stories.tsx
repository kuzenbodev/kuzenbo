import type { StoryObj } from "@storybook/react";

import { Textarea } from "../textarea";
import { baseMeta } from "./textarea-story-shared";

export default {
  ...baseMeta,
  title: "Components/Textarea/Sizes",
};

type Story = StoryObj<typeof baseMeta>;

const sizeOptions = ["xs", "sm", "md", "lg", "xl"] as const;

export const Sizes: Story = {
  render: () => (
    <div className="flex w-80 flex-col gap-3">
      {sizeOptions.map((size) => (
        <Textarea
          defaultValue={`${size.toUpperCase()} handoff note for enterprise rollout stakeholders.`}
          key={size}
          size={size}
        />
      ))}
    </div>
  ),
};
