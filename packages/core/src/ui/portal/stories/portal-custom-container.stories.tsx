import type { StoryObj } from "@storybook/react";

import {
  CustomContainer as CustomContainerStory,
  baseMeta,
} from "./portal-story-shared";

export default {
  ...baseMeta,
  title: "Components/Portal/CustomContainer",
};
type Story = StoryObj<typeof baseMeta>;

export const CustomContainer: Story = CustomContainerStory;
