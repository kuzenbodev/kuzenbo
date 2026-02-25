import type { StoryObj } from "@storybook/react";

import { Default as DefaultScenario, baseMeta } from "./switch-story-shared";

export default {
  ...baseMeta,
  title: "Components/Switch/Default",
};
type Story = StoryObj<typeof baseMeta>;

export const Default: Story = DefaultScenario;
