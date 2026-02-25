import type { StoryObj } from "@storybook/react";

import { Default as DefaultStory, baseMeta } from "./resizable-story-shared";

export default {
  ...baseMeta,
  title: "Components/Resizable/Default",
};
type Story = StoryObj<typeof baseMeta>;

export const Default: Story = DefaultStory;
