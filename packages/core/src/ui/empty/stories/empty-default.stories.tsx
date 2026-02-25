import type { StoryObj } from "@storybook/react";

import { Default as DefaultStory, baseMeta } from "./empty-story-shared";

export default {
  ...baseMeta,
  title: "Components/Empty/Default",
};
type Story = StoryObj<typeof baseMeta>;

export const Default: Story = DefaultStory;
