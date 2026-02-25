import type { StoryObj } from "@storybook/react";

import { Default as DefaultStory, baseMeta } from "./breadcrumb-story-shared";

export default {
  ...baseMeta,
  title: "Components/Breadcrumb/Default",
};
type Story = StoryObj<typeof baseMeta>;

export const Default: Story = DefaultStory;
