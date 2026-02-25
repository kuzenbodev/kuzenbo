import type { StoryObj } from "@storybook/react";

import {
  WithSections as WithSectionsStory,
  baseMeta,
} from "./navigation-menu-story-shared";

export default {
  ...baseMeta,
  title: "Components/NavigationMenu/WithSections",
};

type Story = StoryObj<typeof baseMeta>;

export const WithSections: Story = WithSectionsStory;
