import type { StoryObj } from "@storybook/react";

import { Default as DefaultStory, baseMeta } from "./tabs-story-shared";

export default {
  ...baseMeta,
  title: "Components/Tabs/Default",
};
type Story = StoryObj<typeof baseMeta>;

export const Default: Story = DefaultStory;
