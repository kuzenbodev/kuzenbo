import fs from "node:fs";
import path from "node:path";

import { getRequiredArg, parseArgs } from "./lib/args";
import { REPO_ROOT } from "./lib/repo";
import type {
  ReleaseBump,
  ReleaseChannel,
  WorkspacePackage,
} from "./lib/types";
import { isReleaseBump, isReleaseChannel } from "./lib/version";
import { readWorkspacePackages } from "./lib/workspace";

const CHANGESETS_DIR = path.join(REPO_ROOT, ".changeset");

const toTimestamp = (date: Date): string =>
  date
    .toISOString()
    .replaceAll(/[-:TZ.]/g, "")
    .slice(0, 14);

export const buildReleaseChangesetFilename = ({
  channel,
  date = new Date(),
}: {
  channel: ReleaseChannel;
  date?: Date;
}): string => `release-${channel}-${toTimestamp(date)}.md`;

export const buildReleaseChangesetContent = ({
  packages,
  bump,
  summary,
}: {
  packages: WorkspacePackage[];
  bump: ReleaseBump;
  summary: string;
}): string => {
  const packageLines = packages.map((pkg) => `"${pkg.manifest.name}": ${bump}`);

  return ["---", ...packageLines, "---", "", summary, ""].join("\n");
};

const assertNonEmptySummary = (summary: string): string => {
  const cleaned = summary.trim();
  if (cleaned.length === 0) {
    throw new Error("Release changeset summary must be non-empty.");
  }

  return cleaned;
};

export const createReleaseChangesetFile = ({
  packages,
  bump,
  channel,
  summary,
}: {
  packages: WorkspacePackage[];
  bump: ReleaseBump;
  channel: ReleaseChannel;
  summary: string;
}): string => {
  if (packages.length === 0) {
    throw new Error("No workspace packages found under packages/*");
  }

  const cleanedSummary = assertNonEmptySummary(summary);
  fs.mkdirSync(CHANGESETS_DIR, { recursive: true });

  const filename = buildReleaseChangesetFilename({ channel });
  const filePath = path.join(CHANGESETS_DIR, filename);
  if (fs.existsSync(filePath)) {
    throw new Error(
      `Release changeset already exists at ${filePath}. Re-run after one second or remove stale file.`
    );
  }

  const content = buildReleaseChangesetContent({
    packages,
    bump,
    summary: cleanedSummary,
  });
  fs.writeFileSync(filePath, content, "utf8");
  return filePath;
};

if (import.meta.main) {
  const args = parseArgs(process.argv.slice(2));
  const bumpArg = getRequiredArg(args, "bump");
  const channelArg = getRequiredArg(args, "channel");
  const summaryArg = getRequiredArg(args, "summary");

  if (!isReleaseBump(bumpArg)) {
    throw new Error(`Invalid --bump value: ${bumpArg}`);
  }

  if (!isReleaseChannel(channelArg)) {
    throw new Error(`Invalid --channel value: ${channelArg}`);
  }

  const filePath = createReleaseChangesetFile({
    packages: readWorkspacePackages(),
    bump: bumpArg as ReleaseBump,
    channel: channelArg as ReleaseChannel,
    summary: summaryArg,
  });

  console.log(`Created release changeset: ${filePath}`);
}
