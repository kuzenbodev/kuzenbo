import type { StoryObj } from "@storybook/react";

import {
  HiddenUntilFound as HiddenUntilFoundStory,
  baseMeta,
} from "./collapsible-story-shared";

export default {
  ...baseMeta,
  title: "Components/Collapsible/HiddenUntilFound",
};
type Story = StoryObj<typeof baseMeta>;

export const HiddenUntilFound: Story = HiddenUntilFoundStory;
