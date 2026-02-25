import type { StoryObj } from "@storybook/react";

import { Default as DefaultStory, baseMeta } from "./use-mobile-story-shared";

export default {
  ...baseMeta,
  title: "Hooks/useIsMobile/BreakpointHistory",
};
type Story = StoryObj<typeof baseMeta>;

export const BreakpointHistory: Story = {
  ...DefaultStory,
  parameters: {
    ...DefaultStory.parameters,
    docs: {
      ...DefaultStory.parameters?.docs,
      description: {
        ...DefaultStory.parameters?.docs?.description,
        story: "Breakpoint History scenario.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    if (!canvasElement) {
      throw new Error("Missing story canvas element");
    }
  },
};
