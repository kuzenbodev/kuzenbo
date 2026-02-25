import type { StoryObj } from "@storybook/react";

import { Outline as OutlineStory, baseMeta } from "./alert-story-shared";

export default {
  ...baseMeta,
  title: "Components/Alert/Outline",
};
type Story = StoryObj<typeof baseMeta>;

export const Outline: Story = OutlineStory;
