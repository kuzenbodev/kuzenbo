import type { StoryObj } from "@storybook/react";

import {
  WithBackground as WithBackgroundStory,
  baseMeta,
} from "./empty-story-shared";

export default {
  ...baseMeta,
  title: "Components/Empty/WithBackground",
};
type Story = StoryObj<typeof baseMeta>;

export const WithBackground: Story = WithBackgroundStory;
