import type { StoryObj } from "@storybook/react";

import {
  RejectedFiles as RejectedFilesStory,
  baseMeta,
} from "./dropzone-story-shared";

export default {
  ...baseMeta,
  title: "Components/Dropzone/RejectedFiles",
};
type Story = StoryObj<typeof baseMeta>;

export const RejectedFiles: Story = RejectedFilesStory;
