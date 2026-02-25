import type { StoryObj } from "@storybook/react";

import {
  MultipleFiles as MultipleFilesStory,
  baseMeta,
} from "./dropzone-story-shared";

export default {
  ...baseMeta,
  title: "Components/Dropzone/MultipleFiles",
};
type Story = StoryObj<typeof baseMeta>;

export const MultipleFiles: Story = MultipleFilesStory;
