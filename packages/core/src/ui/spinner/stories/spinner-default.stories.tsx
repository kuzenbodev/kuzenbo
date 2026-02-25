import type { StoryObj } from "@storybook/react";

import { Default as DefaultStory, baseMeta } from "./spinner-story-shared";

export default {
  ...baseMeta,
  title: "Components/Spinner/Default",
};
type Story = StoryObj<typeof baseMeta>;

export const Default: Story = DefaultStory;
