import type { StoryObj } from "@storybook/react";

import { File as FileStory, baseMeta } from "./input-story-shared";

export default {
  ...baseMeta,
  title: "Components/Input/File",
};
type Story = StoryObj<typeof baseMeta>;

export const File: Story = FileStory;
