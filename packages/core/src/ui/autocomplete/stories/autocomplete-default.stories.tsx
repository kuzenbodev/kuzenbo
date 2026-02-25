import type { StoryObj } from "@storybook/react";

import { Default as DefaultStory, baseMeta } from "./autocomplete-story-shared";

export default {
  ...baseMeta,
  title: "Components/Autocomplete/Default",
};
type Story = StoryObj<typeof baseMeta>;

export const Default: Story = DefaultStory;
