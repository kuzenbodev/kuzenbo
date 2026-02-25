import type { StoryObj } from "@storybook/react";

import {
  BudgetAmount as BudgetAmountStory,
  baseMeta,
} from "./number-field-story-shared";

export default {
  ...baseMeta,
  title: "Components/NumberField/BudgetAmount",
};
type Story = StoryObj<typeof baseMeta>;

export const BudgetAmount: Story = BudgetAmountStory;
