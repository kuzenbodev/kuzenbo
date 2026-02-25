import type { StoryObj } from "@storybook/react";

import {
  AllVariants as AllVariantsStory,
  baseMeta,
} from "./badge-story-shared";

export default {
  ...baseMeta,
  title: "Components/Badge/AllVariants",
};
type Story = StoryObj<typeof baseMeta>;

export const AllVariants: Story = AllVariantsStory;
