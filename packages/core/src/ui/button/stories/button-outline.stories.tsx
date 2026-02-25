import type { StoryObj } from "@storybook/react";

import { Outline as OutlineStory, baseMeta } from "./button-story-shared";

export default {
  ...baseMeta,
  title: "Components/Button/Outline",
};
type Story = StoryObj<typeof baseMeta>;

export const Outline: Story = OutlineStory;
