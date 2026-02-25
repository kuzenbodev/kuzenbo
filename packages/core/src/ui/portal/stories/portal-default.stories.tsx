import type { StoryObj } from "@storybook/react";

import { Default as DefaultStory, baseMeta } from "./portal-story-shared";

export default {
  ...baseMeta,
  title: "Components/Portal/Default",
};
type Story = StoryObj<typeof baseMeta>;

export const Default: Story = DefaultStory;
