import type { StoryObj } from "@storybook/react";

import {
  DisabledChecked as DisabledCheckedStory,
  baseMeta,
} from "./checkbox-story-shared";

export default {
  ...baseMeta,
  title: "Components/Checkbox/DisabledChecked",
};
type Story = StoryObj<typeof baseMeta>;

export const DisabledChecked: Story = DisabledCheckedStory;
