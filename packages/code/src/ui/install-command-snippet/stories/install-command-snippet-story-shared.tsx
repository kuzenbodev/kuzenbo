import type { Meta, StoryObj } from "@storybook/react";

import { InstallCommandSnippet } from "../install-command-snippet";

export const baseMeta = {
  title: "Code/InstallCommandSnippet",
  component: InstallCommandSnippet,
  tags: ["autodocs"],
  args: {
    packages: ["@kuzenbo/code", "@kuzenbo/theme"],
  },
} satisfies Meta<typeof InstallCommandSnippet>;

type Story = StoryObj<typeof baseMeta>;

export const Default: Story = {};
