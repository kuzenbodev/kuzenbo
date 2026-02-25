import type { StoryObj } from "@storybook/react";

import {
  Indeterminate as IndeterminateStory,
  baseMeta,
} from "./checkbox-story-shared";

export default {
  ...baseMeta,
  title: "Components/Checkbox/Indeterminate",
};
type Story = StoryObj<typeof baseMeta>;

export const Indeterminate: Story = IndeterminateStory;
