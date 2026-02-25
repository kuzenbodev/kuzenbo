import type { StoryObj } from "@storybook/react";

import { Disabled as DisabledStory, baseMeta } from "./checkbox-story-shared";

export default {
  ...baseMeta,
  title: "Components/Checkbox/Disabled",
};
type Story = StoryObj<typeof baseMeta>;

export const Disabled: Story = DisabledStory;
