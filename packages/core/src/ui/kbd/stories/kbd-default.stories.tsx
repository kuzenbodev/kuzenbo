import type { StoryObj } from "@storybook/react";

import { Default as DefaultStory, baseMeta } from "./kbd-story-shared";

export default {
  ...baseMeta,
  title: "Components/Kbd/Default",
};
type Story = StoryObj<typeof baseMeta>;

export const Default: Story = DefaultStory;
