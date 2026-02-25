import type { StoryObj } from "@storybook/react";

import { Default as DefaultStory, baseMeta } from "./marquee-story-shared";

export default {
  ...baseMeta,
  title: "Components/Marquee/Default",
};
type Story = StoryObj<typeof baseMeta>;

export const Default: Story = DefaultStory;
