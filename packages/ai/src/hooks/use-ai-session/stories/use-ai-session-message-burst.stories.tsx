import type { StoryObj } from "@storybook/react";

import {
  Default as DefaultStory,
  baseMeta,
} from "./use-ai-session-story-shared";

export default {
  ...baseMeta,
  title: "AI/useAiSession/MessageBurst",
};
type Story = StoryObj<typeof baseMeta>;

export const MessageBurst: Story = {
  ...DefaultStory,
  parameters: {
    ...DefaultStory.parameters,
    docs: {
      ...DefaultStory.parameters?.docs,
      description: {
        ...DefaultStory.parameters?.docs?.description,
        story: "Message Burst scenario.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    if (!canvasElement) {
      throw new Error("Missing story canvas element");
    }
  },
};
