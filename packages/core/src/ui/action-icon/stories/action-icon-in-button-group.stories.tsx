import type { StoryObj } from "@storybook/react";

import {
  InButtonGroup as InButtonGroupStory,
  baseMeta,
} from "./action-icon-story-shared";

export default {
  ...baseMeta,
  title: "Components/ActionIcon/InButtonGroup",
};
type Story = StoryObj<typeof baseMeta>;

export const InButtonGroup: Story = InButtonGroupStory;
