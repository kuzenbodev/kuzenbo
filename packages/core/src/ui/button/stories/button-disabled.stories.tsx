import type { StoryObj } from "@storybook/react";

import { Disabled as DisabledStory, baseMeta } from "./button-story-shared";

export default {
  ...baseMeta,
  title: "Components/Button/Disabled",
};
type Story = StoryObj<typeof baseMeta>;

export const Disabled: Story = DisabledStory;
