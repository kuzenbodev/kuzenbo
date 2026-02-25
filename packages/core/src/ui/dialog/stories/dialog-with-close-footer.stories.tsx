import type { StoryObj } from "@storybook/react";

import {
  WithCloseFooter as WithCloseFooterStory,
  baseMeta,
} from "./dialog-story-shared";

export default {
  ...baseMeta,
  title: "Components/Dialog/WithCloseFooter",
};
type Story = StoryObj<typeof baseMeta>;

export const WithCloseFooter: Story = WithCloseFooterStory;
