import type { StoryObj } from "@storybook/react";

import {
  Default as DefaultStory,
  baseMeta,
} from "./dropdown-menu-story-shared";

export default {
  ...baseMeta,
  title: "Components/DropdownMenu/Default",
};

type Story = StoryObj<typeof baseMeta>;

export const Default: Story = DefaultStory;
