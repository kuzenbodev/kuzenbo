import type { StoryObj } from "@storybook/react";

import {
  WithSubmenu as WithSubmenuStory,
  baseMeta,
} from "./context-menu-story-shared";

export default {
  ...baseMeta,
  title: "Components/ContextMenu/WithSubmenu",
};

type Story = StoryObj<typeof baseMeta>;

export const WithSubmenu: Story = WithSubmenuStory;
