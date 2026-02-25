import type { StoryObj } from "@storybook/react";

import { Default as DefaultStory, baseMeta } from "./button-story-shared";

export default {
  ...baseMeta,
  title: "Components/Button/Default",
};
type Story = StoryObj<typeof baseMeta>;

export const Default: Story = DefaultStory;
