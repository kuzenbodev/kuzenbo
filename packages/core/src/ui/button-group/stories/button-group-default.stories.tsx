import type { StoryObj } from "@storybook/react";

import { Default as DefaultStory, baseMeta } from "./button-group-story-shared";

export default {
  ...baseMeta,
  title: "Components/ButtonGroup/Default",
};
type Story = StoryObj<typeof baseMeta>;

export const Default: Story = DefaultStory;
