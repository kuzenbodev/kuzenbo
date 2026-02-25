import type { StoryObj } from "@storybook/react";

import { Default as DefaultStory, baseMeta } from "./pagination-story-shared";

export default {
  ...baseMeta,
  title: "Components/Pagination/Default",
};
type Story = StoryObj<typeof baseMeta>;

export const Default: Story = DefaultStory;
