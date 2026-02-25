import type { StoryObj } from "@storybook/react";

import {
  AsyncConfirmDialog as AsyncConfirmDialogStory,
  baseMeta,
} from "./alert-dialog-story-shared";

export default {
  ...baseMeta,
  title: "Components/AlertDialog/AsyncConfirmDialog",
};
type Story = StoryObj<typeof baseMeta>;

export const AsyncConfirmDialog: Story = AsyncConfirmDialogStory;
