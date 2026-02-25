import type { StoryObj } from "@storybook/react";

import {
  ActionsWithIcons as ActionsWithIconsStory,
  baseMeta,
} from "./button-story-shared";

export default {
  ...baseMeta,
  title: "Components/Button/ActionsWithIcons",
};
type Story = StoryObj<typeof baseMeta>;

export const ActionsWithIcons: Story = ActionsWithIconsStory;
