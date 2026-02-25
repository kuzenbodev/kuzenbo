import type { StoryObj } from "@storybook/react";

import {
  Default as DefaultStory,
  baseMeta,
} from "./use-datatable-state-story-shared";

export default {
  ...baseMeta,
  title: "Datatable/useDatatableState/PageJumper",
};
type Story = StoryObj<typeof baseMeta>;

export const PageJumper: Story = {
  ...DefaultStory,
  parameters: {
    ...DefaultStory.parameters,
    docs: {
      ...DefaultStory.parameters?.docs,
      description: {
        ...DefaultStory.parameters?.docs?.description,
        story: "Page Jumper scenario.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    if (!canvasElement) {
      throw new Error("Missing story canvas element");
    }
  },
};
