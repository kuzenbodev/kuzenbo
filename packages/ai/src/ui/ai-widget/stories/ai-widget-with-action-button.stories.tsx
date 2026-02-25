import type { StoryObj } from "@storybook/react";

import { Default as DefaultStory, baseMeta } from "./ai-widget-story-shared";

export default {
  ...baseMeta,
  title: "AI/AiWidget/WithActionButton",
};
type Story = StoryObj<typeof baseMeta>;

export const WithActionButton: Story = {
  ...DefaultStory,
  parameters: {
    ...DefaultStory.parameters,
    docs: {
      ...DefaultStory.parameters?.docs,
      description: {
        ...DefaultStory.parameters?.docs?.description,
        story: "With Action Button scenario.",
      },
    },
  },
};
