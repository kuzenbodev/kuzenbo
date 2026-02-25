import type { StoryObj } from "@storybook/react";

import {
  InlineStack as InlineStackStory,
  baseMeta,
} from "./spacer-story-shared";

export default {
  ...baseMeta,
  title: "Components/Spacer/InlineStack",
};
type Story = StoryObj<typeof baseMeta>;

export const InlineStack: Story = InlineStackStory;
