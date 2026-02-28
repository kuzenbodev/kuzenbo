import { describe, expect, it } from "bun:test";
import { readFileSync, rmSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  applyPublishConfigManifestOverrides,
  assertPackedManifestIsPublishSafe,
  buildTarballFilename,
  findUnsupportedDependencyProtocols,
  findMissingPackedManifestFileReferences,
} from "../lib/publish-artifacts";
import { runCommand } from "../lib/shell";
import type { WorkspacePackage } from "../lib/types";
import {
  assertBunLockWorkspaceVersionsMatchManifests,
  findBunLockWorkspaceVersion,
} from "../lib/validation";

const testsDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(testsDir, "../../..");
const CLIENT_DIRECTIVE_PATTERN = /^["']use client["'];/;

const createWorkspacePackage = ({
  name,
  version,
  workspaceDir,
}: {
  name: string;
  version: string;
  workspaceDir: string;
}): WorkspacePackage => ({
  dirPath: path.join(repoRoot, workspaceDir),
  manifest: {
    name,
    version,
  },
  manifestPath: path.join(repoRoot, workspaceDir, "package.json"),
});

const readRepoFile = (relativeFilePath: string): string =>
  readFileSync(path.join(repoRoot, relativeFilePath), "utf8");

const assertDistFileHasClientDirective = (relativeFilePath: string): void => {
  const distSource = readRepoFile(relativeFilePath).trimStart();

  expect(CLIENT_DIRECTIVE_PATTERN.test(distSource)).toBe(true);
};

describe("release packaging helpers", () => {
  it("builds deterministic tarball filename for scoped packages", () => {
    expect(buildTarballFilename("@kuzenbo/core", "0.0.1-alpha.4")).toBe(
      "kuzenbo-core-0.0.1-alpha.4.tgz"
    );
  });

  it("detects unsupported catalog and workspace dependency protocols", () => {
    const matches = findUnsupportedDependencyProtocols({
      dependencies: {
        react: "^19.0.0",
        tailwindcss: "catalog:",
      },
      name: "@kuzenbo/core",
      peerDependencies: {
        "@kuzenbo/theme": "workspace:*",
      },
      version: "0.0.1-alpha.4",
    });

    expect(matches).toEqual([
      {
        dependencyName: "tailwindcss",
        field: "dependencies",
        specifier: "catalog:",
      },
      {
        dependencyName: "@kuzenbo/theme",
        field: "peerDependencies",
        specifier: "workspace:*",
      },
    ]);
  });

  it("accepts packed manifests with semver dependency ranges", () => {
    expect(() =>
      assertPackedManifestIsPublishSafe(
        {
          dependencies: {
            react: "^19.0.0",
          },
          name: "@kuzenbo/core",
          peerDependencies: {
            "@kuzenbo/theme": "^0.0.1-alpha.4",
          },
          version: "0.0.1-alpha.4",
        },
        "@kuzenbo/core"
      )
    ).not.toThrow();
  });

  it("rejects packed manifests that still contain unsupported protocols", () => {
    expect(() =>
      assertPackedManifestIsPublishSafe(
        {
          dependencies: {
            tailwindcss: "catalog:",
          },
          name: "@kuzenbo/theme",
          version: "0.0.1-alpha.4",
        },
        "@kuzenbo/theme"
      )
    ).toThrow();
  });

  it("applies publishConfig manifest overrides for packed output", () => {
    const rewritten = applyPublishConfigManifestOverrides({
      exports: {
        ".": {
          default: "./src/index.ts",
          import: "./src/index.ts",
          types: "./src/index.ts",
        },
      },
      main: "./src/index.ts",
      module: "./src/index.ts",
      name: "@kuzenbo/code",
      publishConfig: {
        exports: {
          ".": {
            default: "./dist/index.js",
            import: "./dist/index.js",
            types: "./dist/index.d.ts",
          },
        },
        main: "./dist/index.js",
        module: "./dist/index.js",
        types: "./dist/index.d.ts",
      },
      types: "./src/index.ts",
      version: "0.0.1-alpha.4",
    });

    expect(rewritten.main).toBe("./dist/index.js");
    expect(rewritten.module).toBe("./dist/index.js");
    expect(rewritten.types).toBe("./dist/index.d.ts");
    expect(rewritten.exports).toEqual({
      ".": {
        default: "./dist/index.js",
        import: "./dist/index.js",
        types: "./dist/index.d.ts",
      },
    });
  });

  it("reports missing manifest entrypoints against packed files", () => {
    const missing = findMissingPackedManifestFileReferences(
      {
        exports: {
          ".": {
            default: "./src/index.ts",
            import: "./src/index.ts",
            types: "./src/index.ts",
          },
        },
        main: "./src/index.ts",
        module: "./src/index.ts",
        name: "@kuzenbo/code",
        types: "./src/index.ts",
        version: "0.0.1-alpha.4",
      },
      ["package.json", "dist/index.js", "dist/index.d.ts"]
    );

    expect(missing).toEqual(["./src/index.ts"]);
  });

  it("accepts wildcard export paths when tarball files match", () => {
    const missing = findMissingPackedManifestFileReferences(
      {
        exports: {
          "./prebuilt/*.css": "./dist/prebuilt/*.css",
        },
        name: "@kuzenbo/theme",
        version: "0.0.1-alpha.4",
      },
      ["package.json", "dist/prebuilt/kuzenbo.css"]
    );

    expect(missing).toEqual([]);
  });

  it("keeps root background and foreground declarations in styles dist css", () => {
    const stylesPackagePath = path.join(repoRoot, "packages/styles");
    const stylesManifestPath = path.join(stylesPackagePath, "package.json");
    const stylesManifest = JSON.parse(
      readFileSync(stylesManifestPath, "utf8")
    ) as {
      name: string;
      version: string;
    };
    const tarballName = buildTarballFilename(
      stylesManifest.name,
      stylesManifest.version
    );
    const tarballPath = path.join(stylesPackagePath, tarballName);

    runCommand("bun", ["run", "build"], {
      cwd: stylesPackagePath,
    });
    runCommand("bun", ["pm", "pack"], {
      cwd: stylesPackagePath,
    });

    try {
      const packedStylesCss = runCommand(
        "tar",
        ["-xOf", tarballName, "package/dist/recommended.css"],
        {
          cwd: stylesPackagePath,
        }
      );

      expect(packedStylesCss).toContain(
        "background-color: var(--kb-background);"
      );
      expect(packedStylesCss).toContain("color: var(--kb-foreground);");
    } finally {
      rmSync(tarballPath, { force: true });
    }
  });

  it("keeps client directives on hardened dist entrypoints and keeps theme provider on root dist export", () => {
    runCommand("bun", ["run", "build"], {
      cwd: path.join(repoRoot, "packages/core"),
    });
    runCommand("bun", ["run", "build"], {
      cwd: path.join(repoRoot, "packages/code"),
    });
    runCommand("bun", ["run", "build"], {
      cwd: path.join(repoRoot, "packages/theme"),
    });

    for (const relativeFilePath of [
      "packages/core/dist/ui/announcement.js",
      "packages/core/dist/ui/field.js",
      "packages/core/dist/ui/pill.js",
      "packages/core/dist/ui/slider.js",
      "packages/code/dist/ui/playground.js",
      "packages/theme/dist/theme-provider.js",
    ]) {
      assertDistFileHasClientDirective(relativeFilePath);
    }

    expect(readRepoFile("packages/theme/dist/index.js")).toContain(
      "ThemeProvider"
    );
  }, 20_000);
});

describe("bun.lock workspace version helpers", () => {
  const bunLockContent = `{
  "lockfileVersion": 1,
  "workspaces": {
    "packages/core": {
      "name": "@kuzenbo/core",
      "version": "1.0.0",
    },
    "packages/hooks": {
      "name": "@kuzenbo/hooks",
      "version": "1.0.0",
    },
  },
}`;

  it("extracts workspace version from bun.lock content", () => {
    expect(
      findBunLockWorkspaceVersion({
        bunLockContent,
        workspacePath: "packages/core",
      })
    ).toBe("1.0.0");
  });

  it("fails when lockfile version drifts from package manifest version", () => {
    const packages = [
      createWorkspacePackage({
        name: "@kuzenbo/core",
        version: "1.0.1",
        workspaceDir: "packages/core",
      }),
    ];

    expect(() =>
      assertBunLockWorkspaceVersionsMatchManifests({
        bunLockContent,
        packages,
      })
    ).toThrow();
  });
});

describe("shell command helpers", () => {
  it("passes args literally without shell expansion", () => {
    const literalArg = "value-$HOME-`echo hi`";
    const result = runCommand("node", [
      "-e",
      "process.stdout.write(process.argv[1] ?? '')",
      literalArg,
    ]);

    expect(result).toBe(literalArg);
  });
});
