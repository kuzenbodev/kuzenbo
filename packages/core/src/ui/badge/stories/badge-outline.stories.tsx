import type { StoryObj } from "@storybook/react";

import { Outline as OutlineStory, baseMeta } from "./badge-story-shared";

export default {
  ...baseMeta,
  title: "Components/Badge/Outline",
};
type Story = StoryObj<typeof baseMeta>;

export const Outline: Story = OutlineStory;
