import type { StoryObj } from "@storybook/react";

import {
  WithCharacterCount as WithCharacterCountStory,
  baseMeta,
} from "./textarea-story-shared";

export default {
  ...baseMeta,
  title: "Components/Textarea/WithCharacterCount",
};
type Story = StoryObj<typeof baseMeta>;

export const WithCharacterCount: Story = WithCharacterCountStory;
