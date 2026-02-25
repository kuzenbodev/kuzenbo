import type { StoryObj } from "@storybook/react";

import {
  Default as DefaultStory,
  baseMeta,
} from "./use-isomorphic-effect-story-shared";

export default {
  ...baseMeta,
  title: "Hooks/useIsomorphicEffect/DependencyDriven",
};
type Story = StoryObj<typeof baseMeta>;

export const DependencyDriven: Story = {
  ...DefaultStory,
  parameters: {
    ...DefaultStory.parameters,
    docs: {
      ...DefaultStory.parameters?.docs,
      description: {
        ...DefaultStory.parameters?.docs?.description,
        story: "Dependency Driven scenario.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    if (!canvasElement) {
      throw new Error("Missing story canvas element");
    }
  },
};
