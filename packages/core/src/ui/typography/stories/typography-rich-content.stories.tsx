import type { StoryObj } from "@storybook/react";

import {
  RichContent as TypographyRichContentStory,
  baseMeta,
} from "./typography-story-shared";

export default {
  ...baseMeta,
  title: "Components/Typography/RichContent",
};
type Story = StoryObj<typeof baseMeta>;

export const RichContent: Story = TypographyRichContentStory;
