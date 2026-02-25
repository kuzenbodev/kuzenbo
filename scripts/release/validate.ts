import type { ReleaseChannel, ReleaseOptions } from "./lib/types";

import { getOptionalArg, getRequiredArg, parseArgs } from "./lib/args";
import { resolveReleaseRef } from "./lib/branch-policy";
import { loadReleaseConfig } from "./lib/config";
import { validateReleaseState } from "./lib/validation";
import { isReleaseChannel } from "./lib/version";
import { readWorkspacePackages } from "./lib/workspace";

export const runReleaseValidation = ({
  version,
  channel,
  ref,
}: ReleaseOptions): string => {
  const config = loadReleaseConfig();
  const packages = readWorkspacePackages();
  const resolvedRef = resolveReleaseRef({
    channel,
    config,
    ref,
  });

  validateReleaseState({
    config,
    packages,
    options: {
      version,
      channel,
      ref: resolvedRef,
    },
  });

  return resolvedRef;
};

if (import.meta.main) {
  const args = parseArgs(process.argv.slice(2));
  const version = getRequiredArg(args, "version");
  const channelArg = getRequiredArg(args, "channel");
  const refArg = getOptionalArg(args, "ref");

  if (!isReleaseChannel(channelArg)) {
    throw new Error(`Invalid --channel value: ${channelArg}`);
  }

  const resolvedRef = runReleaseValidation({
    version,
    channel: channelArg as ReleaseChannel,
    ref: refArg,
  });

  console.log(
    `Release validation passed for ${version} (${channelArg}) on ref ${resolvedRef}.`
  );
}
