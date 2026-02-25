import type { StoryObj } from "@storybook/react";

import {
  ResponsiveBottom as ResponsiveBottomStory,
  baseMeta,
} from "./affix-story-shared";

export default {
  ...baseMeta,
  title: "Components/Affix/ResponsiveBottom",
};
type Story = StoryObj<typeof baseMeta>;

export const ResponsiveBottom: Story = ResponsiveBottomStory;
