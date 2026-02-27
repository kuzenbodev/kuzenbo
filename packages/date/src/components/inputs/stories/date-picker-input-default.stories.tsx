import type { StoryObj } from "@storybook/react";

import {
  Default as DefaultStory,
  baseMeta,
} from "./date-picker-input-story-shared";

export default {
  ...baseMeta,
  title: "Components/Date/DatePickerInput/Default",
};

type Story = StoryObj<typeof baseMeta>;

export const Default: Story = DefaultStory;
