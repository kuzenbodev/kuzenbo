import type { StoryObj } from "@storybook/react";

import {
  WithError as WithErrorStory,
  baseMeta,
} from "./form-field-story-shared";

export default {
  ...baseMeta,
  title: "Components/FormField/WithError",
};
type Story = StoryObj<typeof baseMeta>;

export const WithError: Story = WithErrorStory;
