import type { StoryObj } from "@storybook/react";

import {
  VerticalStack as VerticalStackStory,
  baseMeta,
} from "./spacer-story-shared";

export default {
  ...baseMeta,
  title: "Components/Spacer/VerticalStack",
};
type Story = StoryObj<typeof baseMeta>;

export const VerticalStack: Story = VerticalStackStory;
