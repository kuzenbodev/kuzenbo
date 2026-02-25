import type { StoryObj } from "@storybook/react";

import { Default as DefaultStory, baseMeta } from "./dropzone-story-shared";

export default {
  ...baseMeta,
  title: "Components/Dropzone/Default",
};
type Story = StoryObj<typeof baseMeta>;

export const Default: Story = DefaultStory;
