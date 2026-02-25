import type { StoryObj } from "@storybook/react";

import {
  WithHelperText as WithHelperTextStory,
  baseMeta,
} from "./form-field-story-shared";

export default {
  ...baseMeta,
  title: "Components/FormField/WithHelperText",
};
type Story = StoryObj<typeof baseMeta>;

export const WithHelperText: Story = WithHelperTextStory;
