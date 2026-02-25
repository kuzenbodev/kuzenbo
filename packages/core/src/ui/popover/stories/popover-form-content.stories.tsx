import type { StoryObj } from "@storybook/react";

import {
  FormContent as FormContentStory,
  baseMeta,
} from "./popover-story-shared";

export default {
  ...baseMeta,
  title: "Components/Popover/FormContent",
};
type Story = StoryObj<typeof baseMeta>;

export const FormContent: Story = FormContentStory;
