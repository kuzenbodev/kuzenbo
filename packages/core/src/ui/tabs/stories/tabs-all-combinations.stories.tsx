import type { StoryObj } from "@storybook/react";

import {
  AllCombinations as AllCombinationsStory,
  baseMeta,
} from "./tabs-story-shared";

export default {
  ...baseMeta,
  title: "Components/Tabs/All Combinations",
};
type Story = StoryObj<typeof baseMeta>;

export const AllCombinations: Story = AllCombinationsStory;
