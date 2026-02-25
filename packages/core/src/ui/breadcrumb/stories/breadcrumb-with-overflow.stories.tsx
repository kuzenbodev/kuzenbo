import type { StoryObj } from "@storybook/react";

import {
  WithOverflow as WithOverflowStory,
  baseMeta,
} from "./breadcrumb-story-shared";

export default {
  ...baseMeta,
  title: "Components/Breadcrumb/WithOverflow",
};
type Story = StoryObj<typeof baseMeta>;

export const WithOverflow: Story = WithOverflowStory;
