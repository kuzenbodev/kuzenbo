import type { StoryObj } from "@storybook/react";

import {
  DefaultOpen as DefaultOpenStory,
  baseMeta,
} from "./collapsible-story-shared";

export default {
  ...baseMeta,
  title: "Components/Collapsible/DefaultOpen",
};
type Story = StoryObj<typeof baseMeta>;

export const DefaultOpen: Story = DefaultOpenStory;
