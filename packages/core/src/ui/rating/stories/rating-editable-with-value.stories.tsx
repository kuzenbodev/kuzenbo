import type { StoryObj } from "@storybook/react";

import {
  EditableWithValue as EditableWithValueScenario,
  baseMeta,
} from "./rating-story-shared";

export default {
  ...baseMeta,
  title: "Components/Rating/EditableWithValue",
};
type Story = StoryObj<typeof baseMeta>;

export const EditableWithValue: Story = EditableWithValueScenario;
