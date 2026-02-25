import type { StoryObj } from "@storybook/react";

import {
  VariantGallery as VariantGalleryStory,
  baseMeta,
} from "./theme-icon-story-shared";

export default {
  ...baseMeta,
  title: "Components/ThemeIcon/VariantGallery",
};
type Story = StoryObj<typeof baseMeta>;

export const VariantGallery: Story = VariantGalleryStory;
