import { execFileSync, execSync } from "node:child_process";

import { REPO_ROOT } from "./repo";

interface CommandOptions {
  cwd?: string;
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

export const runStreaming = (command: string): void => {
  execSync(command, {
    cwd: REPO_ROOT,
    stdio: "inherit",
  });
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
