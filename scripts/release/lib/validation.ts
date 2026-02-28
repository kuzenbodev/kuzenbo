import fs from "node:fs";
import path from "node:path";

import {
  assertChannelMatchesRef,
  assertSupportedReleaseRef,
} from "./branch-policy";
import { BUN_LOCK_PATH, REPO_ROOT, WORKFLOWS_DIR } from "./repo";
import type { ReleaseConfig, ReleaseOptions, WorkspacePackage } from "./types";
import { assertChannelMatchesVersion } from "./version";
import {
  assertLockstep,
  assertPackagesExist,
  getPackageByName,
} from "./workspace";

const assertNoOverlap = (
  left: string[],
  right: string[],
  leftLabel: string,
  rightLabel: string
): void => {
  const rightSet = new Set(right);
  for (const item of left) {
    if (rightSet.has(item)) {
      throw new Error(
        `${leftLabel} and ${rightLabel} contain the same package: ${item}`
      );
    }
  }
};

const assertPackagePrivacy = ({
  packages,
  names,
  expectedPrivate,
  label,
  allowMissing = false,
}: {
  packages: WorkspacePackage[];
  names: string[];
  expectedPrivate: boolean;
  label: string;
  allowMissing?: boolean;
}): void => {
  for (const packageName of names) {
    const pkg = getPackageByName(packages, packageName);
    if (!pkg) {
      if (allowMissing) {
        continue;
      }

      throw new Error(
        `${label} package not found in workspace: ${packageName}`
      );
    }

    const actualPrivate = pkg.manifest.private === true;
    if (actualPrivate !== expectedPrivate) {
      throw new Error(
        `${label} package ${packageName} must have private=${String(expectedPrivate)}`
      );
    }
  }
};

const NON_WORKSPACE_NEVER_PUBLISH = new Set(["@kuzenbo/website"]);

const getWorkspaceScopedNeverPublish = (neverPublish: string[]): string[] => {
  const workspaceScoped: string[] = [];

  for (const packageName of neverPublish) {
    if (NON_WORKSPACE_NEVER_PUBLISH.has(packageName)) {
      continue;
    }

    workspaceScoped.push(packageName);
  }

  return workspaceScoped;
};

const findMatchingObjectBraceIndex = (
  content: string,
  openingBraceIndex: number
): number => {
  let depth = 0;
  let inString = false;
  let isEscaped = false;

  for (let index = openingBraceIndex; index < content.length; index += 1) {
    const char = content[index];

    if (isEscaped) {
      isEscaped = false;
      continue;
    }

    if (inString && char === "\\") {
      isEscaped = true;
      continue;
    }

    if (char === '"') {
      inString = !inString;
      continue;
    }

    if (inString) {
      continue;
    }

    if (char === "{") {
      depth += 1;
      continue;
    }

    if (char === "}") {
      depth -= 1;
      if (depth === 0) {
        return index;
      }
    }
  }

  return -1;
};

const normalizeWorkspacePath = (workspacePath: string): string =>
  workspacePath.split(path.sep).join("/");

export const findBunLockWorkspaceVersion = ({
  bunLockContent,
  workspacePath,
}: {
  bunLockContent: string;
  workspacePath: string;
}): string => {
  const normalizedWorkspacePath = normalizeWorkspacePath(workspacePath);
  const workspaceKey = `"${normalizedWorkspacePath}":`;
  const workspaceKeyIndex = bunLockContent.indexOf(workspaceKey);

  if (workspaceKeyIndex === -1) {
    throw new Error(
      `bun.lock is missing workspace entry for ${normalizedWorkspacePath}`
    );
  }

  const objectStartIndex = bunLockContent.indexOf("{", workspaceKeyIndex);
  if (objectStartIndex === -1) {
    throw new Error(
      `bun.lock workspace entry is malformed for ${normalizedWorkspacePath}`
    );
  }

  const objectEndIndex = findMatchingObjectBraceIndex(
    bunLockContent,
    objectStartIndex
  );
  if (objectEndIndex < 0) {
    throw new Error(
      `bun.lock workspace entry has unbalanced braces for ${normalizedWorkspacePath}`
    );
  }

  const workspaceEntryContent = bunLockContent.slice(
    objectStartIndex,
    objectEndIndex + 1
  );
  const versionMatch = workspaceEntryContent.match(/"version"\s*:\s*"([^"]+)"/);
  if (!versionMatch?.[1]) {
    throw new Error(
      `bun.lock workspace entry is missing version for ${normalizedWorkspacePath}`
    );
  }

  return versionMatch[1];
};

export const assertBunLockWorkspaceVersionsMatchManifests = ({
  packages,
  bunLockContent,
}: {
  packages: WorkspacePackage[];
  bunLockContent?: string;
}): void => {
  const resolvedBunLockContent =
    bunLockContent ?? fs.readFileSync(BUN_LOCK_PATH, "utf8");
  const mismatches: string[] = [];

  for (const pkg of packages) {
    const workspacePath = path.relative(REPO_ROOT, pkg.dirPath);
    const lockfileVersion = findBunLockWorkspaceVersion({
      bunLockContent: resolvedBunLockContent,
      workspacePath,
    });

    if (lockfileVersion !== pkg.manifest.version) {
      mismatches.push(
        `${pkg.manifest.name}: package.json=${pkg.manifest.version}, bun.lock=${lockfileVersion}`
      );
    }
  }

  if (mismatches.length === 0) {
    return;
  }

  throw new Error(
    `bun.lock workspace versions are out of sync with package manifests:\n- ${mismatches.join(
      "\n- "
    )}\nRun \`bun install\` and commit the updated \`bun.lock\` before releasing.`
  );
};

const parseWorkflowTriggers = (workflow: string): Set<string> => {
  const lines = workflow.split(/\r?\n/);

  for (let index = 0; index < lines.length; index += 1) {
    const rawLine = lines[index];
    if (rawLine === undefined) {
      continue;
    }
    const trimmed = rawLine.trim();
    if (!trimmed.startsWith("on:")) {
      continue;
    }

    const inlineValue = trimmed.slice("on:".length).trim();
    if (inlineValue.length > 0) {
      if (inlineValue.startsWith("[") && inlineValue.endsWith("]")) {
        const entries = inlineValue
          .slice(1, -1)
          .split(",")
          .map((entry) => entry.trim().replaceAll(/['"]/g, ""))
          .filter((entry) => entry.length > 0);
        return new Set(entries);
      }

      const cleanedInline = inlineValue.replaceAll(/['"]/g, "");
      return new Set([cleanedInline]);
    }

    const events = new Set<string>();
    for (let cursor = index + 1; cursor < lines.length; cursor += 1) {
      const childLine = lines[cursor];
      if (childLine === undefined) {
        break;
      }
      if (childLine.trim().length === 0) {
        continue;
      }

      if (!childLine.startsWith("  ")) {
        break;
      }

      const topLevelEventMatch = childLine.match(/^ {2}([A-Za-z0-9_-]+):/);
      if (topLevelEventMatch) {
        const [, eventName] = topLevelEventMatch;
        if (eventName) {
          events.add(eventName);
        }
      }
    }

    return events;
  }

  throw new Error("Trusted publishing workflow must define an on: trigger");
};

const assertTrustedPublishWorkflow = (config: ReleaseConfig): void => {
  const workflowPath = path.join(
    WORKFLOWS_DIR,
    config.trustedPublish.workflowFile
  );
  if (!fs.existsSync(workflowPath)) {
    throw new Error(`Trusted publishing workflow not found: ${workflowPath}`);
  }

  const workflow = fs.readFileSync(workflowPath, "utf8");
  const events = parseWorkflowTriggers(workflow);
  if (events.size !== 1 || !events.has("workflow_dispatch")) {
    const parsedEvents = [...events].toSorted().join(", ");
    throw new Error(
      `Trusted publishing workflow must be workflow_dispatch only, found: ${parsedEvents}`
    );
  }

  if (!workflow.includes("id-token: write")) {
    throw new Error("Trusted publishing workflow must request id-token: write");
  }

  if (!workflow.includes("--provenance")) {
    throw new Error(
      "Trusted publishing workflow must use npm publish --provenance"
    );
  }
};

const assertWebsiteNeverPublish = (): void => {
  const websiteManifestPath = path.join(
    REPO_ROOT,
    "apps",
    "website",
    "package.json"
  );

  if (!fs.existsSync(websiteManifestPath)) {
    throw new Error(
      "Never-publish package @kuzenbo/website requires apps/website/package.json"
    );
  }

  const websiteManifest = JSON.parse(
    fs.readFileSync(websiteManifestPath, "utf8")
  ) as { private?: boolean };

  if (websiteManifest.private !== true) {
    throw new Error(
      "@kuzenbo/website must remain private=true while configured as never-publish"
    );
  }
};

export const buildPublishPlan = ({
  config,
  packages,
}: {
  config: ReleaseConfig;
  packages: WorkspacePackage[];
}): WorkspacePackage[] => {
  const blockedPackages = new Set(config.publishBlocked);
  const neverPublishPackages = new Set(config.neverPublish);
  const seenAllowlist = new Set<string>();
  const publishPlan: WorkspacePackage[] = [];

  for (const packageName of config.publishAllowlist) {
    if (seenAllowlist.has(packageName)) {
      throw new Error(
        `publishAllowlist contains duplicate package entry: ${packageName}`
      );
    }
    seenAllowlist.add(packageName);

    if (blockedPackages.has(packageName)) {
      throw new Error(
        `Blocked package ${packageName} cannot be included in publish plan`
      );
    }

    if (neverPublishPackages.has(packageName)) {
      throw new Error(
        `Never-publish package ${packageName} cannot be included in publish plan`
      );
    }

    const pkg = getPackageByName(packages, packageName);
    if (!pkg) {
      throw new Error(
        `Allowlist package not found in workspace: ${packageName}`
      );
    }

    publishPlan.push(pkg);
  }

  return publishPlan;
};

export const validateReleaseState = ({
  config,
  packages,
  options,
}: {
  config: ReleaseConfig;
  packages: WorkspacePackage[];
  options: ReleaseOptions;
}): void => {
  const lockstepVersion = assertLockstep(packages);
  if (lockstepVersion !== options.version) {
    throw new Error(
      `Lockstep version mismatch: expected ${options.version}, found ${lockstepVersion}`
    );
  }

  assertChannelMatchesVersion(options.version, options.channel);
  if (options.ref) {
    assertSupportedReleaseRef(options.ref, config);
    assertChannelMatchesRef({
      channel: options.channel,
      ref: options.ref,
      config,
    });
  }

  assertPackagesExist(packages, config.publishAllowlist, "Allowlist");
  assertPackagesExist(packages, config.publishBlocked, "Blocked");
  assertPackagesExist(
    packages,
    getWorkspaceScopedNeverPublish(config.neverPublish),
    "Never-publish"
  );

  assertNoOverlap(
    config.publishAllowlist,
    config.publishBlocked,
    "publishAllowlist",
    "publishBlocked"
  );
  assertNoOverlap(
    config.publishAllowlist,
    config.neverPublish,
    "publishAllowlist",
    "neverPublish"
  );
  assertNoOverlap(
    config.publishBlocked,
    config.neverPublish,
    "publishBlocked",
    "neverPublish"
  );

  assertPackagePrivacy({
    packages,
    names: config.publishAllowlist,
    expectedPrivate: false,
    label: "Allowlist",
  });
  assertPackagePrivacy({
    packages,
    names: config.publishBlocked,
    expectedPrivate: true,
    label: "Blocked",
  });
  assertPackagePrivacy({
    packages,
    names: config.neverPublish,
    expectedPrivate: true,
    label: "Never-publish",
    allowMissing: true,
  });

  if (config.neverPublish.includes("@kuzenbo/website")) {
    assertWebsiteNeverPublish();
  }

  assertBunLockWorkspaceVersionsMatchManifests({ packages });
  assertTrustedPublishWorkflow(config);
  buildPublishPlan({ config, packages });
};
