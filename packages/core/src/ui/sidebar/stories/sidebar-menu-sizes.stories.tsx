import type { StoryObj } from "@storybook/react";

import { MenuSizes as MenuSizesStory, baseMeta } from "./sidebar-story-shared";

export default {
  ...baseMeta,
  title: "Components/Sidebar/MenuSizes",
};

type Story = StoryObj<typeof baseMeta>;

export const MenuSizes: Story = MenuSizesStory;
