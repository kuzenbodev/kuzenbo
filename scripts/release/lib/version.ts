import { RELEASE_BUMPS, RELEASE_CHANNELS } from "./types";
import type { ReleaseBump, ReleaseChannel } from "./types";

interface ParsedVersion {
  major: number;
  minor: number;
  patch: number;
  prerelease?: string;
}

const VERSION_REGEX =
  /^(?<major>\d+)\.(?<minor>\d+)\.(?<patch>\d+)(?:-(?<prerelease>[0-9A-Za-z.-]+))?$/;

export const isReleaseChannel = (value: string): value is ReleaseChannel =>
  RELEASE_CHANNELS.includes(value as ReleaseChannel);

export const isReleaseBump = (value: string): value is ReleaseBump =>
  RELEASE_BUMPS.includes(value as ReleaseBump);

export const parseVersion = (version: string): ParsedVersion => {
  const match = version.match(VERSION_REGEX);

  if (!match?.groups) {
    throw new Error(`Invalid semver format: ${version}`);
  }

  return {
    major: Number(match.groups.major),
    minor: Number(match.groups.minor),
    patch: Number(match.groups.patch),
    prerelease: match.groups.prerelease,
  };
};

export const assertChannelMatchesVersion = (
  version: string,
  channel: ReleaseChannel
): void => {
  const parsed = parseVersion(version);

  if (channel === "stable") {
    if (parsed.prerelease) {
      throw new Error(
        `Stable channel requires non-prerelease version, received ${version}`
      );
    }
    return;
  }

  if (!parsed.prerelease) {
    throw new Error(
      `Channel ${channel} requires a prerelease suffix (for example alpha.N), received ${version}`
    );
  }
};

export const formatVersionSummary = (version: string): string => {
  const parsed = parseVersion(version);
  if (!parsed.prerelease) {
    return `${parsed.major}.${parsed.minor}.${parsed.patch} (stable)`;
  }

  return `${parsed.major}.${parsed.minor}.${parsed.patch} (${parsed.prerelease})`;
};
