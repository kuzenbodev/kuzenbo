import type { StoryObj } from "@storybook/react";

import {
  Default as DefaultStory,
  baseMeta,
} from "./use-isomorphic-effect-story-shared";

export default {
  ...baseMeta,
  title: "Hooks/useIsomorphicEffect/Default",
};
type Story = StoryObj<typeof baseMeta>;

export const Default: Story = DefaultStory;
