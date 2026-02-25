import type { StoryObj } from "@storybook/react";

import { Default as DefaultStory, baseMeta } from "./dialog-story-shared";

export default {
  ...baseMeta,
  title: "Components/Dialog/Default",
};
type Story = StoryObj<typeof baseMeta>;

export const Default: Story = DefaultStory;
