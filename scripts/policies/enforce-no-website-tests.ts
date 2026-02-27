import { existsSync, readdirSync } from "node:fs";
import path from "node:path";

const WEBSITE_WORKSPACE = "apps/website";
const BLOCKED_DIRECTORY_NAMES = new Set(["__tests__", "tests"]);
const BLOCKED_FILE_PATTERN = /\.(test|spec)\.[cm]?[jt]sx?$/;

const workspaceRoot = process.cwd();
const websiteRoot = path.resolve(workspaceRoot, WEBSITE_WORKSPACE);

if (!existsSync(websiteRoot)) {
  throw new Error(`Missing workspace path: ${WEBSITE_WORKSPACE}`);
}

const toPosixRelativePath = (absolutePath: string): string =>
  path.relative(workspaceRoot, absolutePath).split(path.sep).join("/");

const violations: string[] = [];

const scanDirectory = (directoryPath: string): void => {
  for (const entry of readdirSync(directoryPath, { withFileTypes: true })) {
    const entryPath = path.join(directoryPath, entry.name);

    if (entry.isDirectory()) {
      if (BLOCKED_DIRECTORY_NAMES.has(entry.name)) {
        violations.push(`${toPosixRelativePath(entryPath)}/`);
        continue;
      }

      scanDirectory(entryPath);
      continue;
    }

    if (entry.isFile() && BLOCKED_FILE_PATTERN.test(entry.name)) {
      violations.push(toPosixRelativePath(entryPath));
    }
  }
};

scanDirectory(websiteRoot);

if (violations.length > 0) {
  const sortedViolations = [...violations].toSorted((left, right) =>
    left.localeCompare(right)
  );

  console.error(
    [
      "Website test policy violation: apps/website must not include direct test files.",
      "Move test coverage to the owning package workspace (for example packages/core or packages/hooks).",
      "",
      ...sortedViolations.map((filePath) => `- ${filePath}`),
    ].join("\n")
  );

  process.exit(1);
}

console.log(
  "Website test policy passed: no direct tests or test directories found in apps/website."
);
