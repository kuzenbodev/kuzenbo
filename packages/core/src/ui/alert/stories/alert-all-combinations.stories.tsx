import type { StoryObj } from "@storybook/react";

import {
  AllCombinations as AllCombinationsStory,
  baseMeta,
} from "./alert-story-shared";

export default {
  ...baseMeta,
  title: "Components/Alert/AllCombinations",
};
type Story = StoryObj<typeof baseMeta>;

export const AllCombinations: Story = AllCombinationsStory;
