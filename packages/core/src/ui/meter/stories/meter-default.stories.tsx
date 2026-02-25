import type { StoryObj } from "@storybook/react";

import { Default as DefaultStory, baseMeta } from "./meter-story-shared";

export default {
  ...baseMeta,
  title: "Components/Meter/Default",
};
type Story = StoryObj<typeof baseMeta>;

export const Default: Story = DefaultStory;
