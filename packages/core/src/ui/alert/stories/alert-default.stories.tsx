import type { StoryObj } from "@storybook/react";

import { Default as DefaultStory, baseMeta } from "./alert-story-shared";

export default {
  ...baseMeta,
  title: "Components/Alert/Default",
};
type Story = StoryObj<typeof baseMeta>;

export const Default: Story = DefaultStory;
