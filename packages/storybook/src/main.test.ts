import { describe, expect, it } from "bun:test";
import path from "node:path";
import { pathToFileURL } from "node:url";

import { createKuzenboStorybookMainConfig } from "./main";

describe("createKuzenboStorybookMainConfig", () => {
  it("keeps the shared Storybook defaults", () => {
    const config = createKuzenboStorybookMainConfig(
      pathToFileURL("/repo/packages/core/.storybook/main.ts").href
    );

    expect(config.stories).toEqual([
      {
        directory: "../src",
        files: "**/*.stories.@(ts|tsx|mdx)",
      },
    ]);
    expect(config.addons).toEqual([
      "@storybook/addon-docs",
      "@storybook/addon-a11y",
      "@storybook/addon-themes",
    ]);
    expect(config.framework).toEqual({
      name: "@storybook/react-vite",
      options: {},
    });
  });

  it("adds tailwind plugin and fs allow entries", async () => {
    const config = createKuzenboStorybookMainConfig(
      pathToFileURL("/repo/packages/core/.storybook/main.ts").href
    );
    const viteFinal = config.viteFinal as (
      existingConfig: unknown,
      options: unknown
    ) => Promise<{
      plugins?: unknown[];
      server?: {
        fs?: {
          allow?: string[];
        };
      };
    }>;

    const existingPlugin = { name: "existing-plugin" };
    const result = await viteFinal(
      {
        plugins: [existingPlugin],
        server: {
          fs: {
            allow: ["/existing"],
          },
        },
      },
      { configType: "DEVELOPMENT" }
    );

    expect(result?.plugins).toHaveLength(2);
    expect(result?.plugins?.[0]).toBe(existingPlugin);
    expect(result?.server?.fs?.allow).toEqual([
      "/existing",
      path.resolve("/repo/packages/core"),
      path.resolve("/repo"),
    ]);
  });
});
