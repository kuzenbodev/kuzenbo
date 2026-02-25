import type { StoryObj } from "@storybook/react";

import {
  SelectedState as SelectedStateStory,
  baseMeta,
} from "./item-story-shared";

export default {
  ...baseMeta,
  title: "Components/Item/SelectedState",
};

type Story = StoryObj<typeof baseMeta>;

export const SelectedState: Story = SelectedStateStory;
