import type { Meta, StoryObj } from "@storybook/react";

import { InstallCommandSnippet } from "../install-command-snippet";

export const baseMeta = {
  args: {
    packages: ["@kuzenbo/code", "@kuzenbo/theme"],
  },
  component: InstallCommandSnippet,
  tags: ["autodocs"],
  title: "Code/InstallCommandSnippet",
} satisfies Meta<typeof InstallCommandSnippet>;

type Story = StoryObj<typeof baseMeta>;

export const Default: Story = {};
