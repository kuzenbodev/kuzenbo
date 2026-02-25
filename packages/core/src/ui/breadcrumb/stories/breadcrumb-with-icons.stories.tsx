import type { StoryObj } from "@storybook/react";

import {
  WithIcons as WithIconsStory,
  baseMeta,
} from "./breadcrumb-story-shared";

export default {
  ...baseMeta,
  title: "Components/Breadcrumb/WithIcons",
};
type Story = StoryObj<typeof baseMeta>;

export const WithIcons: Story = WithIconsStory;
