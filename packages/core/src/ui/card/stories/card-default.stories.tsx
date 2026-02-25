import type { StoryObj } from "@storybook/react";

import { Default as DefaultStory, baseMeta } from "./card-story-shared";

export default {
  ...baseMeta,
  title: "Components/Card/Default",
};
type Story = StoryObj<typeof baseMeta>;

export const Default: Story = DefaultStory;
