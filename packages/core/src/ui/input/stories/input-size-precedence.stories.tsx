import type { StoryObj } from "@storybook/react";

import {
  SizePrecedence as SizePrecedenceStory,
  baseMeta,
} from "./input-story-shared";

export default {
  ...baseMeta,
  title: "Components/Input/SizePrecedence",
};
type Story = StoryObj<typeof baseMeta>;

export const SizePrecedence: Story = SizePrecedenceStory;
