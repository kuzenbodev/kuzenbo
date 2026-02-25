import type { StoryObj } from "@storybook/react";

import { Default as DefaultStory, baseMeta } from "./toast-story-shared";

export default {
  ...baseMeta,
  title: "Toast notification/Default",
};
type Story = StoryObj<typeof baseMeta>;

export const Default: Story = DefaultStory;
