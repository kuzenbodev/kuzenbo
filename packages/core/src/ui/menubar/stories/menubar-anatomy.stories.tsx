import type { StoryObj } from "@storybook/react";

import { Anatomy as AnatomyStory, baseMeta } from "./menubar-story-shared";

export default {
  ...baseMeta,
  title: "Components/Menubar/Anatomy",
};

type Story = StoryObj<typeof baseMeta>;

export const Anatomy: Story = AnatomyStory;
