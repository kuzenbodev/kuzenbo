import type { StoryObj } from "@storybook/react";

import { Default as DefaultStory, baseMeta } from "./ai-widget-story-shared";

export default {
  ...baseMeta,
  title: "AI/AiWidget/WithStatusCopy",
};
type Story = StoryObj<typeof baseMeta>;

export const WithStatusCopy: Story = {
  ...DefaultStory,
  parameters: {
    ...DefaultStory.parameters,
    docs: {
      ...DefaultStory.parameters?.docs,
      description: {
        ...DefaultStory.parameters?.docs?.description,
        story: "With Status Copy scenario.",
      },
    },
  },
};
