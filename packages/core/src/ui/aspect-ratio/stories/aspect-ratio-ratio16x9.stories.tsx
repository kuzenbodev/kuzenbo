import type { StoryObj } from "@storybook/react";

import {
  Ratio16x9 as Ratio16x9Story,
  baseMeta,
} from "./aspect-ratio-story-shared";

export default {
  ...baseMeta,
  title: "Components/AspectRatio/Ratio16x9",
};
type Story = StoryObj<typeof baseMeta>;

export const Ratio16x9: Story = Ratio16x9Story;
