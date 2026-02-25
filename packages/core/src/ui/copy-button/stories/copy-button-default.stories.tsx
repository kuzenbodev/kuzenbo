import type { StoryObj } from "@storybook/react";

import { Default as DefaultStory, baseMeta } from "./copy-button-story-shared";

export default {
  ...baseMeta,
  title: "Components/CopyButton/Default",
};

type Story = StoryObj<typeof baseMeta>;

export const Default: Story = DefaultStory;
