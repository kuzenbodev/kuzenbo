import type { StoryObj } from "@storybook/react";

import {
  Anatomy as AnatomyStory,
  baseMeta,
} from "./dropdown-menu-story-shared";

export default {
  ...baseMeta,
  title: "Components/DropdownMenu/Anatomy",
};

type Story = StoryObj<typeof baseMeta>;

export const Anatomy: Story = AnatomyStory;
