import type { StoryObj } from "@storybook/react";

import { Default as DefaultStory, baseMeta } from "./toolbar-story-shared";

export default {
  ...baseMeta,
  title: "Components/Toolbar/Default",
};

type Story = StoryObj<typeof baseMeta>;

export const Default: Story = DefaultStory;
