import type { StoryObj } from "@storybook/react";

import { Default as DefaultStory, baseMeta } from "./item-story-shared";

export default {
  ...baseMeta,
  title: "Components/Item/Default",
};

type Story = StoryObj<typeof baseMeta>;

export const Default: Story = DefaultStory;
