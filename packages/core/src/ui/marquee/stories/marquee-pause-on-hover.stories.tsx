import type { StoryObj } from "@storybook/react";

import {
  PauseOnHover as PauseOnHoverStory,
  baseMeta,
} from "./marquee-story-shared";

export default {
  ...baseMeta,
  title: "Components/Marquee/PauseOnHover",
};
type Story = StoryObj<typeof baseMeta>;

export const PauseOnHover: Story = PauseOnHoverStory;
