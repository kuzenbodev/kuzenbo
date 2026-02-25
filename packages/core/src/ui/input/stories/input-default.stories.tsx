import type { StoryObj } from "@storybook/react";

import { Default as DefaultStory, baseMeta } from "./input-story-shared";

export default {
  ...baseMeta,
  title: "Components/Input/Default",
};
type Story = StoryObj<typeof baseMeta>;

export const Default: Story = DefaultStory;
