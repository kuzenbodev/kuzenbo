import type { StoryObj } from "@storybook/react";

import {
  Narrow as ContainerNarrowStory,
  baseMeta,
} from "./container-story-shared";

export default {
  ...baseMeta,
  title: "Components/Container/Narrow",
};
type Story = StoryObj<typeof baseMeta>;

export const Narrow: Story = ContainerNarrowStory;
