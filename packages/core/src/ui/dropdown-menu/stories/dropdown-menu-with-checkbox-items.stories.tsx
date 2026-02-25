import type { StoryObj } from "@storybook/react";

import {
  WithCheckboxItems as WithCheckboxItemsStory,
  baseMeta,
} from "./dropdown-menu-story-shared";

export default {
  ...baseMeta,
  title: "Components/DropdownMenu/WithCheckboxItems",
};

type Story = StoryObj<typeof baseMeta>;

export const WithCheckboxItems: Story = WithCheckboxItemsStory;
