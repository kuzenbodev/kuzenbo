import type { StoryObj } from "@storybook/react";

import {
  Default as DefaultStory,
  baseMeta,
} from "./navigation-list-story-shared";

export default {
  ...baseMeta,
  title: "Components/NavigationList/Default",
};

type Story = StoryObj<typeof baseMeta>;

export const Default: Story = DefaultStory;
