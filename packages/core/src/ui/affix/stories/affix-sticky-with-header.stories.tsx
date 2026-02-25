import type { StoryObj } from "@storybook/react";

import {
  StickyWithHeader as StickyWithHeaderStory,
  baseMeta,
} from "./affix-story-shared";

export default {
  ...baseMeta,
  title: "Components/Affix/StickyWithHeader",
};
type Story = StoryObj<typeof baseMeta>;

export const StickyWithHeader: Story = StickyWithHeaderStory;
