import type { StoryObj } from "@storybook/react";

import {
  IndicatorSizePrecedence as IndicatorSizePrecedenceStory,
  baseMeta,
} from "./radio-group-story-shared";

export default {
  ...baseMeta,
  title: "Components/RadioGroup/IndicatorSizePrecedence",
};
type Story = StoryObj<typeof baseMeta>;

export const IndicatorSizePrecedence: Story = IndicatorSizePrecedenceStory;
