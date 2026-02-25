import type { StoryObj } from "@storybook/react";

import {
  NestedSubmenu as NestedSubmenuStory,
  baseMeta,
} from "./menubar-story-shared";

export default {
  ...baseMeta,
  title: "Components/Menubar/NestedSubmenu",
};

type Story = StoryObj<typeof baseMeta>;

export const NestedSubmenu: Story = NestedSubmenuStory;
