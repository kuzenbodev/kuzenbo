import type { StoryObj } from "@storybook/react";

import {
  StatusMatrix as StatusMatrixStory,
  baseMeta,
} from "./copy-button-story-shared";

export default {
  ...baseMeta,
  title: "Components/CopyButton/StatusMatrix",
};

type Story = StoryObj<typeof baseMeta>;

export const StatusMatrix: Story = StatusMatrixStory;
