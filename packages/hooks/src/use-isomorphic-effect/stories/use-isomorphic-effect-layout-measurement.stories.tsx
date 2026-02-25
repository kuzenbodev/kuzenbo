import type { StoryObj } from "@storybook/react";

import {
  Default as DefaultStory,
  baseMeta,
} from "./use-isomorphic-effect-story-shared";

export default {
  ...baseMeta,
  title: "Hooks/useIsomorphicEffect/LayoutMeasurement",
};
type Story = StoryObj<typeof baseMeta>;

export const LayoutMeasurement: Story = {
  ...DefaultStory,
  parameters: {
    ...DefaultStory.parameters,
    docs: {
      ...DefaultStory.parameters?.docs,
      description: {
        ...DefaultStory.parameters?.docs?.description,
        story: "Layout Measurement scenario.",
      },
    },
  },
};
