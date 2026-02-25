import type { StoryObj } from "@storybook/react";

import { Default as DefaultStory, baseMeta } from "./textarea-story-shared";

export default {
  ...baseMeta,
  title: "Components/Textarea/Default",
};
type Story = StoryObj<typeof baseMeta>;

export const Default: Story = DefaultStory;
