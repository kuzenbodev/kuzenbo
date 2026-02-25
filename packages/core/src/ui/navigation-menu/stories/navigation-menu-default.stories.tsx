import type { StoryObj } from "@storybook/react";

import {
  Default as DefaultStory,
  baseMeta,
} from "./navigation-menu-story-shared";

export default {
  ...baseMeta,
  title: "Components/NavigationMenu/Default",
};

type Story = StoryObj<typeof baseMeta>;

export const Default: Story = DefaultStory;
