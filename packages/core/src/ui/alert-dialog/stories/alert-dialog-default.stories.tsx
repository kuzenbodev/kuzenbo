import type { StoryObj } from "@storybook/react";

import { Default as DefaultStory, baseMeta } from "./alert-dialog-story-shared";

export default {
  ...baseMeta,
  title: "Components/AlertDialog/Default",
};
type Story = StoryObj<typeof baseMeta>;

export const Default: Story = DefaultStory;
