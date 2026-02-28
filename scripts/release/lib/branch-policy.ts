import { getCurrentBranch } from "./git";
import type { ReleaseChannel, ReleaseConfig } from "./types";

interface ResolveReleaseRefParams {
  channel: ReleaseChannel;
  config: ReleaseConfig;
  ref?: string;
  currentBranch?: string;
  isCi?: boolean;
}

const getSupportedReleaseRefs = (config: ReleaseConfig): Set<string> =>
  new Set(Object.values(config.releaseBranches));

const RELEASE_REF_PREFIX = "refs/heads/";

export const normalizeReleaseRef = (ref: string): string => {
  const cleanedRef = ref.trim();
  if (cleanedRef.startsWith(RELEASE_REF_PREFIX)) {
    return cleanedRef.slice(RELEASE_REF_PREFIX.length);
  }

  return cleanedRef;
};

export const getExpectedBranch = (
  channel: ReleaseChannel,
  config: ReleaseConfig
): string => {
  const branch = config.releaseBranches[channel];
  if (typeof branch !== "string" || branch.trim().length === 0) {
    throw new Error(
      `Missing release branch mapping for channel ${channel} in release config`
    );
  }

  return branch;
};

export const assertSupportedReleaseRef = (
  ref: string,
  config: ReleaseConfig
): void => {
  const cleanedRef = normalizeReleaseRef(ref);
  if (cleanedRef.length === 0) {
    throw new Error("Release ref must be a non-empty branch name");
  }

  if (!getSupportedReleaseRefs(config).has(cleanedRef)) {
    const supported = [...getSupportedReleaseRefs(config)]
      .toSorted()
      .join(", ");
    throw new Error(
      `Unsupported release ref '${cleanedRef}'. Allowed refs: ${supported}`
    );
  }
};

export const assertChannelMatchesRef = ({
  channel,
  ref,
  config,
}: {
  channel: ReleaseChannel;
  ref: string;
  config: ReleaseConfig;
}): void => {
  const expectedRef = getExpectedBranch(channel, config);
  const normalizedRef = normalizeReleaseRef(ref);
  if (normalizedRef !== expectedRef) {
    throw new Error(
      `Channel ${channel} must publish from branch ${expectedRef}, received ${normalizedRef}`
    );
  }
};

export const resolveReleaseRef = ({
  channel,
  config,
  ref,
  currentBranch,
  isCi = process.env.GITHUB_ACTIONS === "true",
}: ResolveReleaseRefParams): string => {
  const inputRef = ref ? normalizeReleaseRef(ref) : undefined;

  if (inputRef) {
    assertSupportedReleaseRef(inputRef, config);
    assertChannelMatchesRef({ channel, ref: inputRef, config });
    return inputRef;
  }

  if (isCi) {
    throw new Error("Missing required argument: --ref in GitHub Actions");
  }

  const resolvedCurrentBranch = normalizeReleaseRef(
    currentBranch ?? getCurrentBranch()
  );
  if (resolvedCurrentBranch.length === 0) {
    throw new Error(
      "Unable to determine current git branch for release validation. Pass --ref explicitly."
    );
  }

  assertSupportedReleaseRef(resolvedCurrentBranch, config);
  assertChannelMatchesRef({ channel, ref: resolvedCurrentBranch, config });
  return resolvedCurrentBranch;
};
