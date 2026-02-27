import type { StoryObj } from "@storybook/react";

import {
  UncontrolledMultiple as UncontrolledMultipleStory,
  baseMeta,
} from "./year-picker-story-shared";

export default {
  ...baseMeta,
  title: "Components/Date/YearPicker/Uncontrolled",
};

type Story = StoryObj<typeof baseMeta>;

export const UncontrolledMultiple: Story = UncontrolledMultipleStory;
