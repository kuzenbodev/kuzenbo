import type { StoryObj } from "@storybook/react";

import type { PackageManager } from "../package-manager-tabs-types";

import { PackageManagerTabs } from "../package-manager-tabs";
import {
  Default as DefaultStory,
  baseMeta,
} from "./package-manager-tabs-story-shared";

const runtimeCommandByManager: Record<PackageManager, string> = {
  npm: "npm run dev -- --turbo",
  pnpm: "pnpm dev --filter @kuzenbo/website",
  yarn: "yarn workspace @kuzenbo/website dev",
  bun: "bun run dev",
};

const testCommandByManager: Record<PackageManager, string> = {
  npm: "npm run test -- --watch",
  pnpm: "pnpm test -- --watch",
  yarn: "yarn test --watch",
  bun: "bun test --watch",
};

export default {
  ...baseMeta,
  title: "Code/PackageManagerTabs/Default",
};

type Story = StoryObj<typeof baseMeta>;

export const Default: Story = DefaultStory;

export const RuntimeBootstrapCommands: Story = {
  args: {
    managers: ["bun", "pnpm", "npm"],
    defaultValue: "bun",
  },
  render: (args) => (
    <PackageManagerTabs {...args}>
      {(manager) => <code>{runtimeCommandByManager[manager]}</code>}
    </PackageManagerTabs>
  ),
};

export const TestSuiteCommands: Story = {
  args: {
    managers: ["bun", "pnpm", "yarn"],
    defaultValue: "pnpm",
  },
  render: (args) => (
    <PackageManagerTabs {...args}>
      {(manager) => <code>{testCommandByManager[manager]}</code>}
    </PackageManagerTabs>
  ),
};

export const PersistedManagerChoice: Story = {
  args: {
    persistPreference: true,
    persistenceKey: "kuzenbo:storybook:package-manager-tabs",
  },
};

export const PartialChildrenRecord: Story = {
  args: {
    managers: ["npm", "pnpm", "bun"],
  },
  render: (args) => (
    <PackageManagerTabs
      {...args}
      children={{
        npm: <code>npm install --save-dev @types/node</code>,
        pnpm: <code>pnpm add -D @types/node</code>,
      }}
    />
  ),
};
