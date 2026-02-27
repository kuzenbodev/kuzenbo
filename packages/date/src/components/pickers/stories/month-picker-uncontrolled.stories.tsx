import type { StoryObj } from "@storybook/react";

import {
  UncontrolledMultiple as UncontrolledMultipleStory,
  baseMeta,
} from "./month-picker-story-shared";

export default {
  ...baseMeta,
  title: "Components/Date/MonthPicker/Uncontrolled",
};

type Story = StoryObj<typeof baseMeta>;

export const UncontrolledMultiple: Story = UncontrolledMultipleStory;
