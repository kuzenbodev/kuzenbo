import type { StoryObj } from "@storybook/react";

import {
  VerticalGroup as VerticalGroupStory,
  baseMeta,
} from "./button-group-story-shared";

export default {
  ...baseMeta,
  title: "Components/ButtonGroup/VerticalGroup",
};
type Story = StoryObj<typeof baseMeta>;

export const VerticalGroup: Story = VerticalGroupStory;
