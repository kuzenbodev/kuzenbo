import type { StoryObj } from "@storybook/react";

import {
  SizePrecedence as SizePrecedenceStory,
  baseMeta,
} from "./toggle-story-shared";

export default {
  ...baseMeta,
  title: "Components/Toggle/SizePrecedence",
};
type Story = StoryObj<typeof baseMeta>;

export const SizePrecedence: Story = SizePrecedenceStory;
