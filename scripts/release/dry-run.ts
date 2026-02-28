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
import { REPO_ROOT } from "./lib/repo";
import type { ReleaseChannel } from "./lib/types";
import { buildPublishPlan } from "./lib/validation";
import { isReleaseChannel } from "./lib/version";
import { readWorkspacePackages } from "./lib/workspace";
import { runReleaseValidation } from "./validate";

const args = parseArgs(process.argv.slice(2));
const version = getRequiredArg(args, "version");
const channelArg = getRequiredArg(args, "channel");
const refArg = getOptionalArg(args, "ref");

if (!isReleaseChannel(channelArg)) {
  throw new Error(`Invalid --channel value: ${channelArg}`);
}

const channel = channelArg as ReleaseChannel;
runReleaseValidation({ version, channel, ref: refArg });

const config = loadReleaseConfig();
const packages = readWorkspacePackages();
const publishPlan = buildPublishPlan({ config, packages });
const artifactsDirectory = fs.mkdtempSync(
  path.join(os.tmpdir(), "kuzenbo-release-dry-run-")
);

try {
  console.log(
    `Running Bun tarball pack + protocol validation for ${publishPlan.length} packages.`
  );
  for (const pkg of publishPlan) {
    console.log(`\n>> ${pkg.manifest.name}`);
    const tarballPath = packWorkspacePackageToTarball(pkg, artifactsDirectory);
    const packedManifest = readPackedPackageManifest(tarballPath);
    assertPackedManifestIsPublishSafe(
      packedManifest,
      pkg.manifest.name,
      tarballPath
    );
    console.log(`Validated artifact: ${path.basename(tarballPath)}`);
  }
} finally {
  fs.rmSync(artifactsDirectory, { recursive: true, force: true });
}

console.log("\nDry-run publish validation completed.");
console.log(`Repository root: ${REPO_ROOT}`);
