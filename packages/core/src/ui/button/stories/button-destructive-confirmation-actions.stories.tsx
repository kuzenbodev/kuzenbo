import type { StoryObj } from "@storybook/react";

import {
  baseMeta,
  DestructiveConfirmationActions as DestructiveConfirmationActionsStory,
} from "./button-story-shared";

export default {
  ...baseMeta,
  title: "Components/Button/DestructiveConfirmationActions",
};
type Story = StoryObj<typeof baseMeta>;

export const DestructiveConfirmationActions: Story =
  DestructiveConfirmationActionsStory;
