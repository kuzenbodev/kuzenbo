import type { StoryObj } from "@storybook/react";

import { Default as DefaultStory, baseMeta } from "./affix-story-shared";

export default {
  ...baseMeta,
  title: "Components/Affix/Default",
};
type Story = StoryObj<typeof baseMeta>;

export const Default: Story = DefaultStory;
