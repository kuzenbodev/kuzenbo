import type { StoryObj } from "@storybook/react";

import { Disabled as DisabledStory, baseMeta } from "./input-story-shared";

export default {
  ...baseMeta,
  title: "Components/Input/Disabled",
};
type Story = StoryObj<typeof baseMeta>;

export const Disabled: Story = DisabledStory;
