import type { StoryObj } from "@storybook/react";

import { Default as DefaultStory, baseMeta } from "./use-mobile-story-shared";

export default {
  ...baseMeta,
  title: "Hooks/useIsMobile/ManualWidthControl",
};
type Story = StoryObj<typeof baseMeta>;

export const ManualWidthControl: Story = {
  ...DefaultStory,
  parameters: {
    ...DefaultStory.parameters,
    docs: {
      ...DefaultStory.parameters?.docs,
      description: {
        ...DefaultStory.parameters?.docs?.description,
        story: "Manual Width Control scenario.",
      },
    },
  },
};
