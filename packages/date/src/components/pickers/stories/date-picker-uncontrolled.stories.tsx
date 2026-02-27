import type { StoryObj } from "@storybook/react";

import {
  UncontrolledMultiple as UncontrolledMultipleStory,
  baseMeta,
} from "./date-picker-story-shared";

export default {
  ...baseMeta,
  title: "Components/Date/DatePicker/Uncontrolled",
};

type Story = StoryObj<typeof baseMeta>;

export const UncontrolledMultiple: Story = UncontrolledMultipleStory;
