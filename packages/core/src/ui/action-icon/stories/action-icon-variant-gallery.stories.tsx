import type { StoryObj } from "@storybook/react";

import {
  VariantGallery as VariantGalleryStory,
  baseMeta,
} from "./action-icon-story-shared";

export default {
  ...baseMeta,
  title: "Components/ActionIcon/VariantGallery",
};
type Story = StoryObj<typeof baseMeta>;

export const VariantGallery: Story = VariantGalleryStory;
