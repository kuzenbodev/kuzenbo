import type { StoryObj } from "@storybook/react";

import {
  CloseOnChangeModes as CloseOnChangeModesStory,
  baseMeta,
} from "./date-picker-input-story-shared";

export default {
  ...baseMeta,
  title: "Components/Date/DatePickerInput/Close On Change Modes",
};

type Story = StoryObj<typeof baseMeta>;

export const CloseOnChangeModes: Story = CloseOnChangeModesStory;
