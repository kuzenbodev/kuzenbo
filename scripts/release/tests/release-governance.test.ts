import { describe, expect, it } from "bun:test";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import type { ReleaseConfig, WorkspacePackage } from "../lib/types";

import {
  buildReleaseChangesetContent,
  buildReleaseChangesetFilename,
} from "../create-release-changeset";
import { getRequiredArg, parseArgs } from "../lib/args";
import {
  assertChannelMatchesRef,
  assertSupportedReleaseRef,
  resolveReleaseRef,
} from "../lib/branch-policy";
import { loadReleaseConfig } from "../lib/config";
import { buildReleaseNotesTemplate } from "../lib/notes";
import { assertPackedManifestIsPublishSafe } from "../lib/publish-artifacts";
import {
  assertBunLockWorkspaceVersionsMatchManifests,
  buildPublishPlan,
  validateReleaseState,
} from "../lib/validation";
import { assertChannelMatchesVersion } from "../lib/version";
import { assertLockstep, readWorkspacePackages } from "../lib/workspace";

const createPackage = ({
  name,
  version,
  isPrivate = false,
  dirPath,
}: {
  name: string;
  version: string;
  isPrivate?: boolean;
  dirPath?: string;
}): WorkspacePackage => ({
  dirPath: dirPath ?? `/tmp/${name.replace("@", "").replace("/", "-")}`,
  manifestPath: `${
    dirPath ?? `/tmp/${name.replace("@", "").replace("/", "-")}`
  }/package.json`,
  manifest: {
    name,
    version,
    private: isPrivate,
  },
});

const createBaseConfig = (): ReleaseConfig => ({
  lockstepScope: "packages/*",
  publishAllowlist: ["@kuzenbo/core", "@kuzenbo/hooks"],
  publishBlocked: ["@kuzenbo/cli"],
  neverPublish: ["@kuzenbo/storybook"],
  releaseBranches: {
    next: "main",
    stable: "main",
  },
  channelToDistTag: {
    next: "next",
    stable: "latest",
  },
  requiredQualityCommands: [
    "bun run lint",
    "bun run typecheck",
    "bun run test",
    "bun run boundaries",
  ],
  trustedPublish: {
    workflowFile: "release.yml",
    environmentName: "npm-publish",
  },
});

const testsDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(testsDir, "../../..");

const inferChannelFromVersion = (version: string): "next" | "stable" =>
  /-/.test(version) ? "next" : "stable";

describe("release governance args and channel rules", () => {
  it("fails when channel is missing from CLI args", () => {
    const args = parseArgs(["--bump", "patch"]);
    expect(() => getRequiredArg(args, "channel")).toThrow();
  });

  it("fails invalid channel values for release changeset command", () => {
    expect(() => {
      execFileSync(
        "bun",
        [
          "scripts/release/create-release-changeset.ts",
          "--channel",
          "canary",
          "--bump",
          "patch",
          "--summary",
          "test",
        ],
        {
          cwd: repoRoot,
          stdio: "pipe",
        }
      );
    }).toThrow();
  });

  it("fails invalid bump values for release changeset command", () => {
    expect(() => {
      execFileSync(
        "bun",
        [
          "scripts/release/create-release-changeset.ts",
          "--channel",
          "next",
          "--bump",
          "none",
          "--summary",
          "test",
        ],
        {
          cwd: repoRoot,
          stdio: "pipe",
        }
      );
    }).toThrow();
  });

  it("rejects stable channel with prerelease version", () => {
    expect(() =>
      assertChannelMatchesVersion("1.2.3-alpha.0", "stable")
    ).toThrow();
  });

  it("rejects prerelease channel when version has no prerelease suffix", () => {
    expect(() => assertChannelMatchesVersion("1.2.3", "next")).toThrow();
  });
});

describe("changesets configuration", () => {
  it("contains trusted publishing workflow settings", () => {
    const config = loadReleaseConfig();

    expect(config.trustedPublish.workflowFile).toBe("release.yml");
    expect(config.trustedPublish.environmentName).toBe("npm-publish");
    expect(config.publishAllowlist.length).toBeGreaterThan(0);
    expect(config.publishBlocked.length).toBeGreaterThan(0);
    expect(config.requiredQualityCommands.length).toBeGreaterThan(0);
    expect(config.releaseBranches.stable).toBe("main");
  });

  it("keeps blocked and allowlisted packages disjoint", () => {
    const config = loadReleaseConfig();
    const blocked = new Set(config.publishBlocked);

    for (const packageName of config.publishAllowlist) {
      expect(blocked.has(packageName)).toBe(false);
    }
  });

  it("tracks all workspace packages in changesets fixed lockstep group", () => {
    const changesetsConfigPath = path.resolve(
      repoRoot,
      ".changeset/config.json"
    );
    const changesetsConfig = JSON.parse(
      fs.readFileSync(changesetsConfigPath, "utf8")
    ) as { fixed?: string[][] };
    expect(changesetsConfig.fixed).toBeDefined();

    const fixedEntries = new Set((changesetsConfig.fixed as string[][]).flat());
    const packages = readWorkspacePackages();

    for (const pkg of packages) {
      expect(fixedEntries.has(pkg.manifest.name)).toBe(true);
    }
  });

  it("includes blocked/private packages in fixed lockstep group", () => {
    const changesetsConfigPath = path.resolve(
      repoRoot,
      ".changeset/config.json"
    );
    const changesetsConfig = JSON.parse(
      fs.readFileSync(changesetsConfigPath, "utf8")
    ) as { fixed?: string[][] };
    expect(changesetsConfig.fixed).toBeDefined();
    const fixedEntries = new Set((changesetsConfig.fixed as string[][]).flat());

    expect(fixedEntries.has("@kuzenbo/cli")).toBe(true);
    expect(fixedEntries.has("@kuzenbo/mcp")).toBe(true);
    expect(fixedEntries.has("@kuzenbo/tiptap")).toBe(true);
    expect(fixedEntries.has("@kuzenbo/storybook")).toBe(true);
  });
});

describe("release branch policy", () => {
  it("accepts valid channel to ref pairings", () => {
    const config = createBaseConfig();

    expect(() =>
      assertChannelMatchesRef({
        channel: "next",
        ref: "main",
        config,
      })
    ).not.toThrow();
    expect(() =>
      assertChannelMatchesRef({
        channel: "stable",
        ref: "main",
        config,
      })
    ).not.toThrow();
  });

  it("rejects invalid channel to ref pairings", () => {
    const config = createBaseConfig();

    expect(() =>
      assertChannelMatchesRef({
        channel: "next",
        ref: "alpha",
        config,
      })
    ).toThrow();
  });

  it("rejects unsupported release refs", () => {
    const config = createBaseConfig();
    expect(() =>
      assertSupportedReleaseRef("feature/some-work", config)
    ).toThrow();
  });

  it("accepts refs/heads-prefixed release refs", () => {
    const config = createBaseConfig();
    expect(() =>
      assertSupportedReleaseRef("refs/heads/main", config)
    ).not.toThrow();
    expect(() =>
      assertChannelMatchesRef({
        channel: "stable",
        ref: "refs/heads/main",
        config,
      })
    ).not.toThrow();
  });

  it("resolves local fallback branch when --ref is omitted", () => {
    const config = createBaseConfig();
    const resolvedRef = resolveReleaseRef({
      channel: "next",
      config,
      isCi: false,
      currentBranch: "main",
    });

    expect(resolvedRef).toBe("main");
  });

  it("fails local fallback when current branch is not supported", () => {
    const config = createBaseConfig();
    expect(() =>
      resolveReleaseRef({
        channel: "next",
        config,
        isCi: false,
        currentBranch: "feature/my-work",
      })
    ).toThrow();
  });

  it("requires --ref in CI", () => {
    const config = createBaseConfig();
    expect(() =>
      resolveReleaseRef({
        channel: "next",
        config,
        isCi: true,
      })
    ).toThrow();
  });
});

describe("lockstep guards", () => {
  it("throws when versions drift", () => {
    expect(() =>
      assertLockstep([
        {
          dirPath: "/tmp/one",
          manifestPath: "/tmp/one/package.json",
          manifest: {
            name: "@kuzenbo/one",
            version: "1.0.0",
          },
        },
        {
          dirPath: "/tmp/two",
          manifestPath: "/tmp/two/package.json",
          manifest: {
            name: "@kuzenbo/two",
            version: "1.0.1",
          },
        },
      ])
    ).toThrow();
  });
});

describe("publish plan guards", () => {
  it("rejects packed manifests with unresolved dependency protocols", () => {
    expect(() =>
      assertPackedManifestIsPublishSafe(
        {
          name: "@kuzenbo/core",
          version: "1.0.0",
          dependencies: {
            "@kuzenbo/hooks": "workspace:*",
          },
        },
        "@kuzenbo/core"
      )
    ).toThrow();
  });

  it("fails when bun.lock workspace versions drift from package.json versions", () => {
    const packages = [
      createPackage({
        name: "@kuzenbo/core",
        version: "1.0.1",
        dirPath: path.join(repoRoot, "packages/core"),
      }),
    ];
    const bunLockContent = `{
  "lockfileVersion": 1,
  "workspaces": {
    "packages/core": {
      "name": "@kuzenbo/core",
      "version": "1.0.0",
    },
  },
}`;

    expect(() =>
      assertBunLockWorkspaceVersionsMatchManifests({
        packages,
        bunLockContent,
      })
    ).toThrow();
  });

  it("rejects blocked package in allowlist publish plan", () => {
    const config = createBaseConfig();
    config.publishAllowlist = ["@kuzenbo/core", "@kuzenbo/cli"];
    config.publishBlocked = ["@kuzenbo/cli"];

    const packages = [
      createPackage({ name: "@kuzenbo/core", version: "1.0.0" }),
      createPackage({ name: "@kuzenbo/hooks", version: "1.0.0" }),
      createPackage({
        name: "@kuzenbo/cli",
        version: "1.0.0",
        isPrivate: true,
      }),
      createPackage({
        name: "@kuzenbo/storybook",
        version: "1.0.0",
        isPrivate: true,
      }),
    ];

    expect(() => buildPublishPlan({ config, packages })).toThrow();
  });

  it("builds publish plan in explicit allowlist order", () => {
    const config = createBaseConfig();
    const packages = [
      createPackage({ name: "@kuzenbo/hooks", version: "1.0.0" }),
      createPackage({ name: "@kuzenbo/core", version: "1.0.0" }),
      createPackage({
        name: "@kuzenbo/cli",
        version: "1.0.0",
        isPrivate: true,
      }),
      createPackage({
        name: "@kuzenbo/storybook",
        version: "1.0.0",
        isPrivate: true,
      }),
    ];

    const plan = buildPublishPlan({ config, packages });
    expect(plan.map((pkg) => pkg.manifest.name)).toEqual([
      "@kuzenbo/core",
      "@kuzenbo/hooks",
    ]);
  });

  it("rejects never-publish package in allowlist publish plan", () => {
    const config = createBaseConfig();
    config.publishAllowlist = ["@kuzenbo/core", "@kuzenbo/storybook"];
    config.neverPublish = ["@kuzenbo/storybook"];

    const packages = [
      createPackage({ name: "@kuzenbo/core", version: "1.0.0" }),
      createPackage({
        name: "@kuzenbo/storybook",
        version: "1.0.0",
        isPrivate: true,
      }),
      createPackage({
        name: "@kuzenbo/cli",
        version: "1.0.0",
        isPrivate: true,
      }),
    ];

    expect(() => buildPublishPlan({ config, packages })).toThrow();
  });

  it("rejects duplicate package entries in publish allowlist", () => {
    const config = createBaseConfig();
    config.publishAllowlist = ["@kuzenbo/core", "@kuzenbo/core"];

    const packages = [
      createPackage({ name: "@kuzenbo/core", version: "1.0.0" }),
      createPackage({ name: "@kuzenbo/hooks", version: "1.0.0" }),
      createPackage({
        name: "@kuzenbo/cli",
        version: "1.0.0",
        isPrivate: true,
      }),
      createPackage({
        name: "@kuzenbo/storybook",
        version: "1.0.0",
        isPrivate: true,
      }),
    ];

    expect(() => buildPublishPlan({ config, packages })).toThrow();
  });

  it("passes release validation for current lockstep state", () => {
    const config = loadReleaseConfig();
    const packages = readWorkspacePackages();
    const version = assertLockstep(packages);
    const channel = inferChannelFromVersion(version);

    expect(() =>
      validateReleaseState({
        config,
        packages,
        options: {
          version,
          channel,
        },
      })
    ).not.toThrow();
  });

  it("fails release validation when lockstep does not match input version", () => {
    const config = createBaseConfig();
    const packages = [
      createPackage({ name: "@kuzenbo/core", version: "1.0.0" }),
      createPackage({ name: "@kuzenbo/hooks", version: "1.0.0" }),
      createPackage({
        name: "@kuzenbo/cli",
        version: "1.0.0",
        isPrivate: true,
      }),
      createPackage({
        name: "@kuzenbo/storybook",
        version: "1.0.0",
        isPrivate: true,
      }),
    ];

    expect(() =>
      validateReleaseState({
        config,
        packages,
        options: {
          version: "1.0.1",
          channel: "stable",
        },
      })
    ).toThrow();
  });

  it("fails when never-publish includes unknown workspace package", () => {
    const config = createBaseConfig();
    config.neverPublish = ["@kuzenbo/missing"];

    const packages = [
      createPackage({ name: "@kuzenbo/core", version: "1.0.0" }),
      createPackage({ name: "@kuzenbo/hooks", version: "1.0.0" }),
      createPackage({
        name: "@kuzenbo/cli",
        version: "1.0.0",
        isPrivate: true,
      }),
      createPackage({
        name: "@kuzenbo/storybook",
        version: "1.0.0",
        isPrivate: true,
      }),
    ];

    expect(() =>
      validateReleaseState({
        config,
        packages,
        options: {
          version: "1.0.0",
          channel: "stable",
        },
      })
    ).toThrow();
  });
});

describe("release notes and release changeset templates", () => {
  it("includes version, channel, and dist-tag", () => {
    const markdown = buildReleaseNotesTemplate({
      version: "1.2.3-alpha.0",
      channel: "next",
      distTag: "next",
    });

    expect(markdown.includes("Release 1.2.3-alpha.0")).toBe(true);
    expect(markdown.includes("Channel: next")).toBe(true);
    expect(markdown.includes("npm dist-tag: next")).toBe(true);
  });

  it("builds deterministic release changeset filename from channel and timestamp", () => {
    const filename = buildReleaseChangesetFilename({
      channel: "next",
      date: new Date("2026-02-18T14:05:06.789Z"),
    });

    expect(filename).toBe("release-next-20260218140506.md");
  });

  it("renders all workspace packages with selected bump in release changeset content", () => {
    const markdown = buildReleaseChangesetContent({
      packages: [
        createPackage({ name: "@kuzenbo/core", version: "1.0.0" }),
        createPackage({ name: "@kuzenbo/hooks", version: "1.0.0" }),
      ],
      bump: "minor",
      summary: "Manual lockstep release",
    });

    expect(markdown.includes('"@kuzenbo/core": minor')).toBe(true);
    expect(markdown.includes('"@kuzenbo/hooks": minor')).toBe(true);
    expect(markdown.includes("Manual lockstep release")).toBe(true);
  });
});

describe("boundary policy", () => {
  it("keeps tiptap tagged for turbo boundaries", () => {
    const tiptapTurboJson = JSON.parse(
      fs.readFileSync(
        path.resolve(repoRoot, "packages/tiptap/turbo.json"),
        "utf8"
      )
    ) as { tags?: string[] };

    expect(tiptapTurboJson.tags?.includes("tiptap")).toBe(true);
  });

  it("allows intentional tiptap to core dependency", () => {
    const rootTurboJson = JSON.parse(
      fs.readFileSync(path.resolve(repoRoot, "turbo.json"), "utf8")
    ) as {
      boundaries?: {
        tags?: Record<
          string,
          {
            dependencies?: {
              deny?: string[];
            };
          }
        >;
      };
    };

    const tiptapDeny =
      rootTurboJson.boundaries?.tags?.tiptap?.dependencies?.deny;

    expect(tiptapDeny).toBeDefined();
    expect((tiptapDeny as string[]).includes("core")).toBe(false);
    expect((tiptapDeny as string[]).includes("@kuzenbo/core")).toBe(false);
    expect((tiptapDeny as string[]).includes("website")).toBe(true);
    expect((tiptapDeny as string[]).includes("@kuzenbo/website")).toBe(true);
  });
});

describe("release file layout", () => {
  it("resolves scripts directory from tests", () => {
    const scriptsPath = path.resolve(testsDir, "..");
    expect(scriptsPath.endsWith("/scripts/release")).toBe(true);
  });

  it("removes release:prepare and adds release:changeset scripts in root package", () => {
    const rootPackageJson = JSON.parse(
      fs.readFileSync(path.resolve(repoRoot, "package.json"), "utf8")
    ) as { scripts?: Record<string, string> };

    expect(rootPackageJson.scripts?.["release:prepare"]).toBeUndefined();
    expect(rootPackageJson.scripts?.["release:changeset"]).toBe(
      "bun scripts/release/create-release-changeset.ts"
    );
  });
});
