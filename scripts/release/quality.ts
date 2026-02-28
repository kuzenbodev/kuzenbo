import { loadReleaseConfig } from "./lib/config";
import { runStreaming } from "./lib/shell";

const config = loadReleaseConfig();
const DEFAULT_COMMAND_TIMEOUT_MS = 15 * 60 * 1000;
const COMMAND_TIMEOUTS_MS: Record<string, number> = {
  "bun audit": 2 * 60 * 1000,
  "bun run lint": 6 * 60 * 1000,
  "bun run typecheck": 10 * 60 * 1000,
  "bun run test": 15 * 60 * 1000,
  "bun run boundaries": 5 * 60 * 1000,
};

const getTimeoutMs = (command: string): number =>
  COMMAND_TIMEOUTS_MS[command] ?? DEFAULT_COMMAND_TIMEOUT_MS;

if (config.requiredQualityCommands.length === 0) {
  throw new Error("Release config requiredQualityCommands cannot be empty.");
}

console.log(
  `Running ${config.requiredQualityCommands.length} release quality commands from release config.`
);

for (const command of config.requiredQualityCommands) {
  const timeoutMs = getTimeoutMs(command);
  const startedAt = Date.now();

  console.log(`\n>> ${command}`);
  console.log(`   timeout: ${Math.floor(timeoutMs / 1000)}s`);
  runStreaming(command, { timeoutMs });
  console.log(
    `   completed in ${((Date.now() - startedAt) / 1000).toFixed(1)}s`
  );
}

console.log("\nRelease quality commands completed.");
