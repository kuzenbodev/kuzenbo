import type { StoryObj } from "@storybook/react";

import {
  CartQuantity as CartQuantityStory,
  baseMeta,
} from "./number-field-story-shared";

export default {
  ...baseMeta,
  title: "Components/NumberField/CartQuantity",
};
type Story = StoryObj<typeof baseMeta>;

export const CartQuantity: Story = CartQuantityStory;
