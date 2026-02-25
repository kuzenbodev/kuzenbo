import type { StoryObj } from "@storybook/react";

import {
  Default as DefaultStory,
  baseMeta,
} from "./use-fullscreen-story-shared";

export default {
  ...baseMeta,
  title: "Hooks/useFullscreen/ExternalControl",
};
type Story = StoryObj<typeof baseMeta>;

export const ExternalControl: Story = {
  ...DefaultStory,
  parameters: {
    ...DefaultStory.parameters,
    docs: {
      ...DefaultStory.parameters?.docs,
      description: {
        ...DefaultStory.parameters?.docs?.description,
        story: "External Control scenario.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    if (!canvasElement) {
      throw new Error("Missing story canvas element");
    }
  },
};
