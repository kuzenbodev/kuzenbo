import type { StoryObj } from "@storybook/react";

import {
  RoleAliases as TypographyRoleAliasesStory,
  baseMeta,
} from "./typography-story-shared";

export default {
  ...baseMeta,
  title: "Components/Typography/RoleAliases",
};
type Story = StoryObj<typeof baseMeta>;

export const RoleAliases: Story = TypographyRoleAliasesStory;
