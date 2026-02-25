import type { StoryObj } from "@storybook/react";

import {
  WithoutCloseButton as WithoutCloseButtonStory,
  baseMeta,
} from "./dialog-story-shared";

export default {
  ...baseMeta,
  title: "Components/Dialog/WithoutCloseButton",
};
type Story = StoryObj<typeof baseMeta>;

export const WithoutCloseButton: Story = WithoutCloseButtonStory;
