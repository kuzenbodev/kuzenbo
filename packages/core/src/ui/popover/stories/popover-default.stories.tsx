import type { StoryObj } from "@storybook/react";

import { Default as DefaultStory, baseMeta } from "./popover-story-shared";

export default {
  ...baseMeta,
  title: "Components/Popover/Default",
};
type Story = StoryObj<typeof baseMeta>;

export const Default: Story = DefaultStory;
