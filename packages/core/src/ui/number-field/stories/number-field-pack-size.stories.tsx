import type { StoryObj } from "@storybook/react";

import {
  PackSizeSelector as PackSizeSelectorStory,
  baseMeta,
} from "./number-field-story-shared";

export default {
  ...baseMeta,
  title: "Components/NumberField/PackSizeSelector",
};
type Story = StoryObj<typeof baseMeta>;

export const PackSizeSelector: Story = PackSizeSelectorStory;
