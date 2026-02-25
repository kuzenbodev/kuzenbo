import type { StoryObj } from "@storybook/react";

import { Default as DefaultScenario, baseMeta } from "./checkbox-story-shared";

export default {
  ...baseMeta,
  title: "Components/Checkbox/Default",
};
type Story = StoryObj<typeof baseMeta>;

export const Default: Story = DefaultScenario;
