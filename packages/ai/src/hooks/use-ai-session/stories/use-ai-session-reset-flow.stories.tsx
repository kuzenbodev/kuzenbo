import type { StoryObj } from "@storybook/react";

import {
  Default as DefaultStory,
  baseMeta,
} from "./use-ai-session-story-shared";

export default {
  ...baseMeta,
  title: "AI/useAiSession/ResetFlow",
};
type Story = StoryObj<typeof baseMeta>;

export const ResetFlow: Story = {
  ...DefaultStory,
  parameters: {
    ...DefaultStory.parameters,
    docs: {
      ...DefaultStory.parameters?.docs,
      description: {
        ...DefaultStory.parameters?.docs?.description,
        story: "Reset Flow scenario.",
      },
    },
  },
};
