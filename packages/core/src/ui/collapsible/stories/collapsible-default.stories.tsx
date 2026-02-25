import type { StoryObj } from "@storybook/react";

import { Default as DefaultStory, baseMeta } from "./collapsible-story-shared";

export default {
  ...baseMeta,
  title: "Components/Collapsible/Default",
};
type Story = StoryObj<typeof baseMeta>;

export const Default: Story = DefaultStory;
