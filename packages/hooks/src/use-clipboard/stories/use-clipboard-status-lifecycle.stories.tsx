import type { StoryObj } from "@storybook/react";

import {
  Default as DefaultStory,
  baseMeta,
} from "./use-clipboard-story-shared";

export default {
  ...baseMeta,
  title: "Hooks/useClipboard/StatusLifecycle",
};
type Story = StoryObj<typeof baseMeta>;

export const StatusLifecycle: Story = {
  ...DefaultStory,
  parameters: {
    ...DefaultStory.parameters,
    docs: {
      ...DefaultStory.parameters?.docs,
      description: {
        ...DefaultStory.parameters?.docs?.description,
        story:
          "Status lifecycle scenario (`idle → copying → copied|failed → idle`) including live announcement output.",
      },
    },
  },
};
