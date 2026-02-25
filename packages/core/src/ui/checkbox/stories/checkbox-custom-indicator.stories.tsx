import type { StoryObj } from "@storybook/react";

import {
  CustomIndicator as CustomIndicatorScenario,
  baseMeta,
} from "./checkbox-story-shared";

export default {
  ...baseMeta,
  title: "Components/Checkbox/Custom Indicator",
};

type Story = StoryObj<typeof baseMeta>;

export const CustomIndicator: Story = CustomIndicatorScenario;
