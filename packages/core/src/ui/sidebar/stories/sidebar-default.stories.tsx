import type { StoryObj } from "@storybook/react";

import { Default as DefaultStory, baseMeta } from "./sidebar-story-shared";

export default {
  ...baseMeta,
  title: "Components/Sidebar/Default",
};

type Story = StoryObj<typeof baseMeta>;

export const Default: Story = DefaultStory;
