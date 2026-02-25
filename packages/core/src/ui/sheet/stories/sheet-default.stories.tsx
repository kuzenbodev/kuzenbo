import type { StoryObj } from "@storybook/react";

import { Default as DefaultStory, baseMeta } from "./sheet-story-shared";

export default {
  ...baseMeta,
  title: "Components/Sheet/Default",
};
type Story = StoryObj<typeof baseMeta>;

export const Default: Story = DefaultStory;
