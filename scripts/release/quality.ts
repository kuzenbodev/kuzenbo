import { loadReleaseConfig } from "./lib/config";
import { runStreaming } from "./lib/shell";

const config = loadReleaseConfig();

if (config.requiredQualityCommands.length === 0) {
  throw new Error("Release config requiredQualityCommands cannot be empty.");
}

console.log(
  `Running ${config.requiredQualityCommands.length} release quality commands from release config.`
);

for (const command of config.requiredQualityCommands) {
  console.log(`\n>> ${command}`);
  runStreaming(command);
}

console.log("\nRelease quality commands completed.");
