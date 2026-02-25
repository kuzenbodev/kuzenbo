import type { StoryObj } from "@storybook/react";

import {
  WithAddonStart as WithAddonStartStory,
  baseMeta,
} from "./input-group-story-shared";

export default {
  ...baseMeta,
  title: "Components/InputGroup/WithAddonStart",
};
type Story = StoryObj<typeof baseMeta>;

export const WithAddonStart: Story = WithAddonStartStory;
