import type { StoryObj } from "@storybook/react";

import { Outline as OutlineStory, baseMeta } from "./empty-story-shared";

export default {
  ...baseMeta,
  title: "Components/Empty/Outline",
};
type Story = StoryObj<typeof baseMeta>;

export const Outline: Story = OutlineStory;
