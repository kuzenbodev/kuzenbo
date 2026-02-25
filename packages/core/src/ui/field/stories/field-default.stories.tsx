import type { StoryObj } from "@storybook/react";

import { Default as DefaultStory, baseMeta } from "./field-story-shared";

export default {
  ...baseMeta,
  title: "Components/Field/Default",
};
type Story = StoryObj<typeof baseMeta>;

export const Default: Story = DefaultStory;
