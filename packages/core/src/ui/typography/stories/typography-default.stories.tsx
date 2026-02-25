import type { StoryObj } from "@storybook/react";

import { Default as DefaultStory, baseMeta } from "./typography-story-shared";

export default {
  ...baseMeta,
  title: "Components/Typography/Default",
};

type Story = StoryObj<typeof baseMeta>;

export const Default: Story = DefaultStory;
