import type { StoryObj } from "@storybook/react";

import {
  baseMeta,
  IconToolbarActions as IconToolbarActionsStory,
} from "./button-story-shared";

export default {
  ...baseMeta,
  title: "Components/Button/IconToolbarActions",
};
type Story = StoryObj<typeof baseMeta>;

export const IconToolbarActions: Story = IconToolbarActionsStory;
