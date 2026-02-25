import type { StoryObj } from "@storybook/react";

import {
  LegacyFallbackDemo as LegacyFallbackDemoStory,
  baseMeta,
} from "./use-clipboard-story-shared";

export default {
  ...baseMeta,
  title: "Hooks/useClipboard/LegacyFallback",
};
type Story = StoryObj<typeof baseMeta>;

export const LegacyFallback: Story = {
  ...LegacyFallbackDemoStory,
  parameters: {
    ...LegacyFallbackDemoStory.parameters,
    docs: {
      ...LegacyFallbackDemoStory.parameters?.docs,
      description: {
        ...LegacyFallbackDemoStory.parameters?.docs?.description,
        story:
          "Legacy fallback enabled. This path uses execCommand when the async clipboard API is unavailable or blocked.",
      },
    },
  },
};
