import type { StoryObj } from "@storybook/react";

import {
  WithOverflowMenu as WithOverflowMenuStory,
  baseMeta,
} from "./toolbar-story-shared";

export default {
  ...baseMeta,
  title: "Components/Toolbar/WithOverflowMenu",
};

type Story = StoryObj<typeof baseMeta>;

export const WithOverflowMenu: Story = WithOverflowMenuStory;
