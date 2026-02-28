import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { getOptionalArg, getRequiredArg, parseArgs } from "./lib/args";
import { loadReleaseConfig } from "./lib/config";
import {
  assertPackedManifestIsPublishSafe,
  packWorkspacePackageToTarball,
  readPackedPackageManifest,
} from "./lib/publish-artifacts";
import { runCommand, runStreamingCommand } from "./lib/shell";
import type { ReleaseChannel, ReleasePublishMode } from "./lib/types";
import { RELEASE_PUBLISH_MODES } from "./lib/types";
import { buildPublishPlan } from "./lib/validation";
import { isReleaseChannel } from "./lib/version";
import { readWorkspacePackages } from "./lib/workspace";
import { runReleaseValidation } from "./validate";

const assertGitHubCiEnvironment = (): void => {
  if (process.env.GITHUB_ACTIONS !== "true") {
    throw new Error(
      "Publishing is only allowed in GitHub Actions for Trusted Publishing."
    );
  }

  if (process.env.RUNNER_ENVIRONMENT === "self-hosted") {
    throw new Error(
      "Trusted publishing must run on GitHub-hosted runners, not self-hosted."
    );
  }
};

const isReleasePublishMode = (value: string): value is ReleasePublishMode =>
  RELEASE_PUBLISH_MODES.includes(value as ReleasePublishMode);

const isVersionAlreadyPublished = (
  packageName: string,
  version: string
): boolean => {
  const packageSpec = `${packageName}@${version}`;

  try {
    const raw = runCommand("npm", ["view", packageSpec, "version", "--json"]);
    const parsed = JSON.parse(raw) as string | string[];

    if (Array.isArray(parsed)) {
      return parsed.includes(version);
    }

    return parsed === version;
  } catch {
    return false;
  }
};

const args = parseArgs(process.argv.slice(2));
const version = getRequiredArg(args, "version");
const channelArg = getRequiredArg(args, "channel");
const ref = getRequiredArg(args, "ref");
const modeArg = getOptionalArg(args, "mode") ?? "normal";

if (!isReleaseChannel(channelArg)) {
  throw new Error(`Invalid --channel value: ${channelArg}`);
}

if (!isReleasePublishMode(modeArg)) {
  throw new Error(`Invalid --mode value: ${modeArg}`);
}

const channel = channelArg as ReleaseChannel;
const mode = modeArg as ReleasePublishMode;
assertGitHubCiEnvironment();
runReleaseValidation({ version, channel, ref });

const config = loadReleaseConfig();
const distTag = config.channelToDistTag[channel];
const packages = readWorkspacePackages();
const publishPlan = buildPublishPlan({ config, packages });
const packagesToPublish =
  mode === "recovery"
    ? publishPlan.filter((pkg) => {
        const packageName = pkg.manifest.name;
        if (!isVersionAlreadyPublished(packageName, version)) {
          return true;
        }

        console.log(
          `Skipping ${packageName}: version ${version} already exists on npm.`
        );
        return false;
      })
    : publishPlan;

if (packagesToPublish.length === 0) {
  console.log(
    `No packages require publishing for version ${version} in ${mode} mode.`
  );
} else {
  const artifactsDirectory = fs.mkdtempSync(
    path.join(os.tmpdir(), "kuzenbo-release-publish-")
  );
  try {
    console.log(
      `Publishing ${packagesToPublish.length} packages to dist-tag ${distTag} (mode=${mode})`
    );
    for (const pkg of packagesToPublish) {
      console.log(`\n>> ${pkg.manifest.name}`);
      const tarballPath = packWorkspacePackageToTarball(
        pkg,
        artifactsDirectory
      );
      const packedManifest = readPackedPackageManifest(tarballPath);
      assertPackedManifestIsPublishSafe(
        packedManifest,
        pkg.manifest.name,
        tarballPath
      );
      runStreamingCommand("npm", [
        "publish",
        "--provenance",
        "--access",
        "public",
        "--tag",
        distTag,
        tarballPath,
      ]);
    }

    console.log("\nPublish completed.");
  } finally {
    fs.rmSync(artifactsDirectory, { recursive: true, force: true });
  }
}
