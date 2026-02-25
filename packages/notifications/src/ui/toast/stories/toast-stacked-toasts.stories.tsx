import type { StoryObj } from "@storybook/react";

import { Default as DefaultStory, baseMeta } from "./toast-story-shared";

export default {
  ...baseMeta,
  title: "Toast notification/StackedToasts",
};
type Story = StoryObj<typeof baseMeta>;

export const StackedToasts: Story = {
  ...DefaultStory,
  parameters: {
    ...DefaultStory.parameters,
    docs: {
      ...DefaultStory.parameters?.docs,
      description: {
        ...DefaultStory.parameters?.docs?.description,
        story: "Stacked Toasts scenario.",
      },
    },
  },
};
