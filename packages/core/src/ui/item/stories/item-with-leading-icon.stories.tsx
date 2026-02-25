import type { StoryObj } from "@storybook/react";

import {
  WithLeadingIcon as WithLeadingIconStory,
  baseMeta,
} from "./item-story-shared";

export default {
  ...baseMeta,
  title: "Components/Item/WithLeadingIcon",
};

type Story = StoryObj<typeof baseMeta>;

export const WithLeadingIcon: Story = WithLeadingIconStory;
