import type { StoryObj } from "@storybook/react";

import {
  ReverseDirection as ReverseDirectionStory,
  baseMeta,
} from "./marquee-story-shared";

export default {
  ...baseMeta,
  title: "Components/Marquee/ReverseDirection",
};
type Story = StoryObj<typeof baseMeta>;

export const ReverseDirection: Story = ReverseDirectionStory;
