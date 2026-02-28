import type { StoryObj } from "@storybook/react";

import {
  Controlled as ControlledStory,
  baseMeta,
} from "./date-input-story-shared";

export default {
  ...baseMeta,
  title: "Components/DateInput/Controlled",
};

type Story = StoryObj<typeof baseMeta>;

export const Controlled: Story = ControlledStory;
