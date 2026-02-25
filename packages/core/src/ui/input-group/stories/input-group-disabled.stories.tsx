import type { StoryObj } from "@storybook/react";

import {
  Disabled as DisabledStory,
  baseMeta,
} from "./input-group-story-shared";

export default {
  ...baseMeta,
  title: "Components/InputGroup/Disabled",
};
type Story = StoryObj<typeof baseMeta>;

export const Disabled: Story = DisabledStory;
