import type { StoryObj } from "@storybook/react";

import {
  CustomIndicator as CustomIndicatorScenario,
  baseMeta,
} from "./radio-group-story-shared";

export default {
  ...baseMeta,
  title: "Components/RadioGroup/Custom Indicator",
};

type Story = StoryObj<typeof baseMeta>;

export const CustomIndicator: Story = CustomIndicatorScenario;
