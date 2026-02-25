import type { StoryObj } from "@storybook/react";

import { Disabled as DisabledStory, baseMeta } from "./switch-story-shared";

export default {
  ...baseMeta,
  title: "Components/Switch/Disabled",
};
type Story = StoryObj<typeof baseMeta>;

export const Disabled: Story = DisabledStory;
