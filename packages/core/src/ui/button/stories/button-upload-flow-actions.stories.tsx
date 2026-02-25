import type { StoryObj } from "@storybook/react";

import {
  baseMeta,
  UploadFlowActions as UploadFlowActionsStory,
} from "./button-story-shared";

export default {
  ...baseMeta,
  title: "Components/Button/UploadFlowActions",
};
type Story = StoryObj<typeof baseMeta>;

export const UploadFlowActions: Story = UploadFlowActionsStory;
