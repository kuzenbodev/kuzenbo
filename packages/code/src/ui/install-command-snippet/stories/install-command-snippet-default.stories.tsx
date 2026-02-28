import type { StoryObj } from "@storybook/react";

import {
  Default as DefaultStory,
  baseMeta,
} from "./install-command-snippet-story-shared";

export default {
  ...baseMeta,
  title: "Code/InstallCommandSnippet/Default",
};

type Story = StoryObj<typeof baseMeta>;

export const Default: Story = DefaultStory;

export const MonorepoWorkspaceInstall: Story = {
  args: {
    commands: {
      bun: "bun add @kuzenbo/code @kuzenbo/theme @kuzenbo/core @kuzenbo/hooks",
      pnpm: "pnpm add @kuzenbo/code @kuzenbo/theme @kuzenbo/core @kuzenbo/hooks -w",
    },
    packages: [
      "@kuzenbo/code",
      "@kuzenbo/theme",
      "@kuzenbo/core",
      "@kuzenbo/hooks",
    ],
  },
};

export const DevDependencySetup: Story = {
  args: {
    commands: {
      bun: "bun add -d @types/node typescript vitest",
      npm: "npm install --save-dev @types/node typescript vitest",
      pnpm: "pnpm add -D @types/node typescript vitest",
      yarn: "yarn add -D @types/node typescript vitest",
    },
    copiedLabel: "Command copied",
    copyLabel: "Copy command",
    packages: ["@types/node", "typescript", "vitest"],
  },
};

export const DocsModeWithoutCopy: Story = {
  args: {
    packages: ["@kuzenbo/code", "@kuzenbo/theme"],
    showCopyButton: false,
  },
};

export const PersistedSelection: Story = {
  args: {
    packages: ["@kuzenbo/code", "@kuzenbo/theme"],
    persistPreference: true,
    persistenceKey: "kuzenbo:storybook:install-command-snippet",
  },
};
