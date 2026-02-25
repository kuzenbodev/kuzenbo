import { loadReleaseConfig } from "../release/lib/config";
import { runStreaming } from "../release/lib/shell";

const releaseConfig = loadReleaseConfig();
const ciCommands = [
  ...new Set([...releaseConfig.requiredQualityCommands, "bun run build"]),
];

if (ciCommands.length === 0) {
  throw new Error("CI quality command list cannot be empty.");
}

console.log(
  `Running ${ciCommands.length} CI quality commands from shared release config.`
);

for (const command of ciCommands) {
  console.log(`\n>> ${command}`);
  runStreaming(command);
}

console.log("\nCI quality commands completed.");
