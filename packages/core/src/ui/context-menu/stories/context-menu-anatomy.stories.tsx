import type { StoryObj } from "@storybook/react";

import { Anatomy as AnatomyStory, baseMeta } from "./context-menu-story-shared";

export default {
  ...baseMeta,
  title: "Components/ContextMenu/Anatomy",
};

type Story = StoryObj<typeof baseMeta>;

export const Anatomy: Story = AnatomyStory;
