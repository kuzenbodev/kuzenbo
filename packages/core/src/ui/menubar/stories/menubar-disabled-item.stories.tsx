import type { StoryObj } from "@storybook/react";

import {
  DisabledItem as DisabledItemStory,
  baseMeta,
} from "./menubar-story-shared";

export default {
  ...baseMeta,
  title: "Components/Menubar/DisabledItem",
};

type Story = StoryObj<typeof baseMeta>;

export const DisabledItem: Story = DisabledItemStory;
