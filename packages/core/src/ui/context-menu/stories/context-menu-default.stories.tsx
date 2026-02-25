import type { StoryObj } from "@storybook/react";

import { Default as DefaultStory, baseMeta } from "./context-menu-story-shared";

export default {
  ...baseMeta,
  title: "Components/ContextMenu/Default",
};

type Story = StoryObj<typeof baseMeta>;

export const Default: Story = DefaultStory;
