import { getRequiredArg, parseArgs } from "./lib/args";
import { loadReleaseConfig } from "./lib/config";
import { ensureReleaseNotesFile } from "./lib/notes";
import { isReleaseChannel } from "./lib/version";

const args = parseArgs(process.argv.slice(2));
const version = getRequiredArg(args, "version");
const channelArg = getRequiredArg(args, "channel");

if (!isReleaseChannel(channelArg)) {
  throw new Error(`Invalid --channel value: ${channelArg}`);
}

const config = loadReleaseConfig();
const distTag = config.channelToDistTag[channelArg];

const releaseNotesPath = ensureReleaseNotesFile({
  version,
  channel: channelArg,
  distTag,
});

console.log(`Created release notes: ${releaseNotesPath}`);
