import type { StoryObj } from "@storybook/react";

import {
  Controlled as ControlledStory,
  baseMeta,
} from "./collapsible-story-shared";

export default {
  ...baseMeta,
  title: "Components/Collapsible/Controlled",
};
type Story = StoryObj<typeof baseMeta>;

export const Controlled: Story = ControlledStory;
