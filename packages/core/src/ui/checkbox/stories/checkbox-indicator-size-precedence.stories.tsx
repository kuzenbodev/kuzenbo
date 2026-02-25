import type { StoryObj } from "@storybook/react";

import {
  IndicatorSizePrecedence as IndicatorSizePrecedenceStory,
  baseMeta,
} from "./checkbox-story-shared";

export default {
  ...baseMeta,
  title: "Components/Checkbox/IndicatorSizePrecedence",
};
type Story = StoryObj<typeof baseMeta>;

export const IndicatorSizePrecedence: Story = IndicatorSizePrecedenceStory;
