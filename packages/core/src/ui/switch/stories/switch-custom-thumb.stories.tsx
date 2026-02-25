import type { StoryObj } from "@storybook/react";

import {
  CustomThumb as CustomThumbScenario,
  baseMeta,
} from "./switch-story-shared";

export default {
  ...baseMeta,
  title: "Components/Switch/Custom Thumb",
};

type Story = StoryObj<typeof baseMeta>;

export const CustomThumb: Story = CustomThumbScenario;
