import type { StoryObj } from "@storybook/react";

import {
  Default as ContainerDefaultStory,
  baseMeta,
} from "./container-story-shared";

export default {
  ...baseMeta,
  title: "Components/Container/Default",
};
type Story = StoryObj<typeof baseMeta>;

export const Default: Story = ContainerDefaultStory;
