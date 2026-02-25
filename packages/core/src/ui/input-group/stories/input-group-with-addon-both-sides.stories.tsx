import type { StoryObj } from "@storybook/react";

import {
  WithAddonBothSides as WithAddonBothSidesStory,
  baseMeta,
} from "./input-group-story-shared";

export default {
  ...baseMeta,
  title: "Components/InputGroup/WithAddonBothSides",
};
type Story = StoryObj<typeof baseMeta>;

export const WithAddonBothSides: Story = WithAddonBothSidesStory;
