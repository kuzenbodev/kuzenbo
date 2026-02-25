import type { StoryObj } from "@storybook/react";

import {
  UseCases as UseCasesStory,
  baseMeta,
} from "./navigation-list-story-shared";

export default {
  ...baseMeta,
  title: "Components/NavigationList/UseCases",
};

type Story = StoryObj<typeof baseMeta>;

export const UseCases: Story = UseCasesStory;
