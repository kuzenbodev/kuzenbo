import type { StoryObj } from "@storybook/react";

import {
  SemanticScale as TypographySemanticScaleStory,
  baseMeta,
} from "./typography-story-shared";

export default {
  ...baseMeta,
  title: "Components/Typography/SemanticScale",
};
type Story = StoryObj<typeof baseMeta>;

export const SemanticScale: Story = TypographySemanticScaleStory;
