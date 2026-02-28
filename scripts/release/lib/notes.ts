import fs from "node:fs";
import path from "node:path";

import { REPO_ROOT } from "./repo";
import type { ReleaseChannel } from "./types";

const toIsoDate = (): string => new Date().toISOString().slice(0, 10);

export const buildReleaseNotesTemplate = ({
  version,
  channel,
  distTag,
}: {
  version: string;
  channel: ReleaseChannel;
  distTag: string;
}): string => {
  const today = toIsoDate();
  return [
    `# Release ${version} 🧾`,
    "",
    `- Date: ${today}`,
    `- Channel: ${channel}`,
    `- npm dist-tag: ${distTag}`,
    "",
    "## Summary ✅",
    "",
    "- Add high-level release summary.",
    "",
    "## Breaking Changes ⚠️",
    "",
    "- List breaking changes or `None`.",
    "",
    "## Package Impact 📦",
    "",
    "- @kuzenbo/core:",
    "- @kuzenbo/hooks:",
    "- @kuzenbo/charts:",
    "- @kuzenbo/notifications:",
    "- @kuzenbo/date:",
    "- @kuzenbo/theme:",
    "- @kuzenbo/styles:",
    "- @kuzenbo/ai:",
    "- @kuzenbo/datatable:",
    "",
    "## Migration Notes 🛠️",
    "",
    "- Include migration steps if needed.",
    "",
    "## Validation Evidence 🔍",
    "",
    "- CI run URL:",
    "- npm packages page:",
    "- Git tag:",
    "",
  ].join("\n");
};

export const ensureReleaseNotesFile = ({
  version,
  channel,
  distTag,
}: {
  version: string;
  channel: ReleaseChannel;
  distTag: string;
}): string => {
  const releasesDir = path.join(REPO_ROOT, "docs", "releases");
  fs.mkdirSync(releasesDir, { recursive: true });

  const releaseNotesPath = path.join(releasesDir, `${version}.md`);
  if (fs.existsSync(releaseNotesPath)) {
    throw new Error(`Release notes already exist: ${releaseNotesPath}`);
  }

  fs.writeFileSync(
    releaseNotesPath,
    buildReleaseNotesTemplate({ version, channel, distTag }),
    "utf8"
  );

  return releaseNotesPath;
};
