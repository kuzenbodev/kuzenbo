import type { StoryObj } from "@storybook/react";

import { Default as DefaultStory, baseMeta } from "./menubar-story-shared";

export default {
  ...baseMeta,
  title: "Components/Menubar/Default",
};

type Story = StoryObj<typeof baseMeta>;

export const Default: Story = DefaultStory;
