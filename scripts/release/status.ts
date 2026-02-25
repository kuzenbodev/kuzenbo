import { loadReleaseConfig } from "./lib/config";
import { getCurrentBranch } from "./lib/git";
import { formatVersionSummary } from "./lib/version";
import { assertLockstep, readWorkspacePackages } from "./lib/workspace";

const config = loadReleaseConfig();
const packages = readWorkspacePackages();

let lockstepSummary = "not lockstep";
try {
  const lockstepVersion = assertLockstep(packages);
  lockstepSummary = `lockstep at ${formatVersionSummary(lockstepVersion)}`;
} catch (error) {
  lockstepSummary = `lockstep mismatch (${(error as Error).message})`;
}

const rows = packages.map((pkg) => ({
  name: pkg.manifest.name,
  version: pkg.manifest.version,
  private: pkg.manifest.private === true ? "true" : "false",
}));

console.log("Kuzenbo release status");
console.log("");
console.log(`Current branch: ${getCurrentBranch()}`);
console.log(`Workspace state: ${lockstepSummary}`);
console.log("");
console.log("Package versions:");
for (const row of rows) {
  console.log(`- ${row.name}: ${row.version} (private=${row.private})`);
}
console.log("");
console.log("Publish allowlist:");
for (const packageName of config.publishAllowlist) {
  console.log(`- ${packageName}`);
}
console.log("");
console.log("Blocked from publish:");
for (const packageName of config.publishBlocked) {
  console.log(`- ${packageName}`);
}
console.log("");
console.log("Never publish:");
for (const packageName of config.neverPublish) {
  console.log(`- ${packageName}`);
}
