import type { StoryObj } from "@storybook/react";

import { Default as DefaultStory, baseMeta } from "./time-grid-story-shared";

export default {
  ...baseMeta,
  title: "Components/TimeGrid/Default",
};

type Story = StoryObj<typeof baseMeta>;

export const Default: Story = DefaultStory;
