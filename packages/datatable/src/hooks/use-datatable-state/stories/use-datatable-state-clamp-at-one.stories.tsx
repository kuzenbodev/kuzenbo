import type { StoryObj } from "@storybook/react";

import {
  Default as DefaultStory,
  baseMeta,
} from "./use-datatable-state-story-shared";

export default {
  ...baseMeta,
  title: "Datatable/useDatatableState/ClampAtOne",
};
type Story = StoryObj<typeof baseMeta>;

export const ClampAtOne: Story = {
  ...DefaultStory,
  parameters: {
    ...DefaultStory.parameters,
    docs: {
      ...DefaultStory.parameters?.docs,
      description: {
        ...DefaultStory.parameters?.docs?.description,
        story: "Clamp At One scenario.",
      },
    },
  },
};
