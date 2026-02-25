import type { StoryObj } from "@storybook/react";

import {
  WithSubmenu as WithSubmenuStory,
  baseMeta,
} from "./dropdown-menu-story-shared";

export default {
  ...baseMeta,
  title: "Components/DropdownMenu/WithSubmenu",
};

type Story = StoryObj<typeof baseMeta>;

export const WithSubmenu: Story = WithSubmenuStory;
