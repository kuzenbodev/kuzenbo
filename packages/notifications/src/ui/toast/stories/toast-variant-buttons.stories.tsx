import type { StoryObj } from "@storybook/react";

import { Default as DefaultStory, baseMeta } from "./toast-story-shared";

export default {
  ...baseMeta,
  title: "Toast notification/VariantButtons",
};
type Story = StoryObj<typeof baseMeta>;

export const VariantButtons: Story = {
  ...DefaultStory,
  parameters: {
    ...DefaultStory.parameters,
    docs: {
      ...DefaultStory.parameters?.docs,
      description: {
        ...DefaultStory.parameters?.docs?.description,
        story: "Variant Buttons scenario.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    if (!canvasElement) {
      throw new Error("Missing story canvas element");
    }
  },
};
