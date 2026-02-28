import path from "node:path";
import { fileURLToPath } from "node:url";

import type { StorybookConfig } from "@storybook/react-vite";
import tailwindcss from "@tailwindcss/vite";

export const createKuzenboStorybookMainConfig = (
  configFileUrl: string
): StorybookConfig => {
  const configDirectory = path.dirname(fileURLToPath(configFileUrl));
  const packageRoot = path.resolve(configDirectory, "..");
  const repoRoot = path.resolve(packageRoot, "..", "..");

  return {
    stories: [
      {
        directory: "../src",
        files: "**/*.stories.@(ts|tsx|mdx)",
      },
    ],
    addons: [
      "@storybook/addon-docs",
      "@storybook/addon-a11y",
      "@storybook/addon-themes",
    ],
    framework: {
      name: "@storybook/react-vite",
      options: {},
    },
    async viteFinal(existingConfig) {
      return {
        ...existingConfig,
        plugins: [...(existingConfig.plugins ?? []), tailwindcss()],
        server: {
          ...existingConfig.server,
          fs: {
            ...existingConfig.server?.fs,
            allow: [
              ...(existingConfig.server?.fs?.allow ?? []),
              packageRoot,
              repoRoot,
            ],
          },
        },
      };
    },
  };
};
