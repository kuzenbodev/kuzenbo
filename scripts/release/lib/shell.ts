import { execFileSync, execSync } from "node:child_process";

import { REPO_ROOT } from "./repo";

interface CommandOptions {
  cwd?: string;
  timeoutMs?: number;
}

export const run = (command: string): string =>
  execSync(command, {
    cwd: REPO_ROOT,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  }).trim();

export const runCommand = (
  command: string,
  args: string[],
  options: CommandOptions = {}
): string =>
  execFileSync(command, args, {
    cwd: options.cwd ?? REPO_ROOT,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  }).trim();

export const runStreaming = (
  command: string,
  options: CommandOptions = {}
): void => {
  try {
    execSync(command, {
      cwd: REPO_ROOT,
      stdio: "inherit",
      timeout: options.timeoutMs,
    });
  } catch (error) {
    if (
      options.timeoutMs &&
      typeof error === "object" &&
      error !== null &&
      "signal" in error &&
      (error as { signal?: string }).signal === "SIGTERM"
    ) {
      throw new Error(
        `Command timed out after ${Math.floor(options.timeoutMs / 1000)}s: ${command}`,
        { cause: error }
      );
    }

    throw error;
  }
};

export const runStreamingCommand = (
  command: string,
  args: string[],
  options: CommandOptions = {}
): void => {
  execFileSync(command, args, {
    cwd: options.cwd ?? REPO_ROOT,
    stdio: "inherit",
  });
};
