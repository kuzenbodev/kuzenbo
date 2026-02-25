import type { StoryObj } from "@storybook/react";

import {
  Link as TypographyLinkStory,
  baseMeta,
} from "./typography-story-shared";

export default {
  ...baseMeta,
  title: "Components/Typography/Link",
};
type Story = StoryObj<typeof baseMeta>;

export const Link: Story = TypographyLinkStory;
