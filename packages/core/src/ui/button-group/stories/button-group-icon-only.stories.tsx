import type { StoryObj } from "@storybook/react";

import {
  IconOnly as IconOnlyStory,
  baseMeta,
} from "./button-group-story-shared";

export default {
  ...baseMeta,
  title: "Components/ButtonGroup/IconOnly",
};
type Story = StoryObj<typeof baseMeta>;

export const IconOnly: Story = IconOnlyStory;
