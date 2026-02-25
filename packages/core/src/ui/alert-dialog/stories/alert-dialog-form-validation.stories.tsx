import type { StoryObj } from "@storybook/react";

import {
  FormValidation as FormValidationStory,
  baseMeta,
} from "./alert-dialog-story-shared";

export default {
  ...baseMeta,
  title: "Components/AlertDialog/FormValidation",
};
type Story = StoryObj<typeof baseMeta>;

export const FormValidation: Story = FormValidationStory;
