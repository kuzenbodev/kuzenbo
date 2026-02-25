import type { StoryObj } from "@storybook/react";

import {
  FormContent as FormContentStory,
  baseMeta,
} from "./sheet-story-shared";

export default {
  ...baseMeta,
  title: "Components/Sheet/FormContent",
};
type Story = StoryObj<typeof baseMeta>;

export const FormContent: Story = FormContentStory;
