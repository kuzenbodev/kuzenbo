import type { Meta, StoryObj } from "@storybook/react";

import { PackageManagerTabs } from "../package-manager-tabs";
import type { PackageManager } from "../package-manager-tabs-types";

const commandByManager: Record<PackageManager, string> = {
  bun: "bun add @kuzenbo/code @kuzenbo/theme",
  npm: "npm install @kuzenbo/code @kuzenbo/theme",
  pnpm: "pnpm add @kuzenbo/code @kuzenbo/theme",
  yarn: "yarn add @kuzenbo/code @kuzenbo/theme",
};

export const baseMeta = {
  component: PackageManagerTabs,
  render: (args) => (
    <PackageManagerTabs {...args}>
      {(manager) => <code>{commandByManager[manager]}</code>}
    </PackageManagerTabs>
  ),
  tags: ["autodocs"],
  title: "Code/PackageManagerTabs",
} satisfies Meta<typeof PackageManagerTabs>;

type Story = StoryObj<typeof baseMeta>;

export const Default: Story = {};
