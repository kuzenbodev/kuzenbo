import type { StoryObj } from "@storybook/react";

import {
  Default as DefaultStory,
  baseMeta,
} from "./use-fullscreen-story-shared";

export default {
  ...baseMeta,
  title: "Hooks/useFullscreen/BlockedRequest",
};
type Story = StoryObj<typeof baseMeta>;

export const BlockedRequest: Story = {
  ...DefaultStory,
  parameters: {
    ...DefaultStory.parameters,
    docs: {
      ...DefaultStory.parameters?.docs,
      description: {
        ...DefaultStory.parameters?.docs?.description,
        story: "Blocked Request scenario.",
      },
    },
  },
};
