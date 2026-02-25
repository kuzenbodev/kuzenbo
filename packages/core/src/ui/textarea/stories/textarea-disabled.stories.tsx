import type { StoryObj } from "@storybook/react";

import { Disabled as DisabledStory, baseMeta } from "./textarea-story-shared";

export default {
  ...baseMeta,
  title: "Components/Textarea/Disabled",
};
type Story = StoryObj<typeof baseMeta>;

export const Disabled: Story = DisabledStory;
