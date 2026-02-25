import type { StoryObj } from "@storybook/react";

import {
  WithButton as WithButtonStory,
  baseMeta,
} from "./input-group-story-shared";

export default {
  ...baseMeta,
  title: "Components/InputGroup/WithButton",
};
type Story = StoryObj<typeof baseMeta>;

export const WithButton: Story = WithButtonStory;
