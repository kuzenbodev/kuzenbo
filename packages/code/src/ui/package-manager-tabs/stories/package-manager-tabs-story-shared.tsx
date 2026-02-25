import type { Meta, StoryObj } from "@storybook/react";

import type { PackageManager } from "../package-manager-tabs-types";

import { PackageManagerTabs } from "../package-manager-tabs";

const commandByManager: Record<PackageManager, string> = {
  npm: "npm install @kuzenbo/code @kuzenbo/theme",
  pnpm: "pnpm add @kuzenbo/code @kuzenbo/theme",
  yarn: "yarn add @kuzenbo/code @kuzenbo/theme",
  bun: "bun add @kuzenbo/code @kuzenbo/theme",
};

export const baseMeta = {
  title: "Code/PackageManagerTabs",
  component: PackageManagerTabs,
  tags: ["autodocs"],
  render: (args) => (
    <PackageManagerTabs {...args}>
      {(manager) => <code>{commandByManager[manager]}</code>}
    </PackageManagerTabs>
  ),
} satisfies Meta<typeof PackageManagerTabs>;

type Story = StoryObj<typeof baseMeta>;

export const Default: Story = {};
