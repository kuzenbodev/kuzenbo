import type { StoryObj } from "@storybook/react";

import {
  DisabledItems as DisabledItemsStory,
  baseMeta,
} from "./context-menu-story-shared";

export default {
  ...baseMeta,
  title: "Components/ContextMenu/DisabledItems",
};

type Story = StoryObj<typeof baseMeta>;

export const DisabledItems: Story = DisabledItemsStory;
