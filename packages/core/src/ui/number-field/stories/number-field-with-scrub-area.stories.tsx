import type { StoryObj } from "@storybook/react";

import {
  WithScrubArea as WithScrubAreaStory,
  baseMeta,
} from "./number-field-story-shared";

export default {
  ...baseMeta,
  title: "Components/NumberField/WithScrubArea",
};
type Story = StoryObj<typeof baseMeta>;

export const WithScrubArea: Story = WithScrubAreaStory;
