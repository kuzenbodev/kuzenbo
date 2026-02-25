import type { StoryObj } from "@storybook/react";

import { Default as DefaultStory, baseMeta } from "./label-story-shared";

export default {
  ...baseMeta,
  title: "Components/Label/Default",
};
type Story = StoryObj<typeof baseMeta>;

export const Default: Story = DefaultStory;
