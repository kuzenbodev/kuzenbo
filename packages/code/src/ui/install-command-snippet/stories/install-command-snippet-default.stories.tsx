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
    packages: [
      "@kuzenbo/code",
      "@kuzenbo/theme",
      "@kuzenbo/core",
      "@kuzenbo/hooks",
    ],
    commands: {
      pnpm: "pnpm add @kuzenbo/code @kuzenbo/theme @kuzenbo/core @kuzenbo/hooks -w",
      bun: "bun add @kuzenbo/code @kuzenbo/theme @kuzenbo/core @kuzenbo/hooks",
    },
  },
};

export const DevDependencySetup: Story = {
  args: {
    packages: ["@types/node", "typescript", "vitest"],
    commands: {
      npm: "npm install --save-dev @types/node typescript vitest",
      pnpm: "pnpm add -D @types/node typescript vitest",
      yarn: "yarn add -D @types/node typescript vitest",
      bun: "bun add -d @types/node typescript vitest",
    },
    copyLabel: "Copy command",
    copiedLabel: "Command copied",
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
