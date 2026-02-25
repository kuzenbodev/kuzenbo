import { expect, test } from "bun:test";
import { readdirSync, readFileSync } from "node:fs";
import { join, relative } from "node:path";

import { resolveCodeFenceLanguage } from "../lib/docs/mdx-pre-adapter";

interface FenceIssue {
  file: string;
  line: number;
  message: string;
}

const WEBSITE_DIRECTORY = join(import.meta.dir, "..");
const COMPONENTS_DOCS_DIRECTORY = join(
  WEBSITE_DIRECTORY,
  "app",
  "(docs)",
  "docs",
  "components"
);

const collectComponentDocFiles = (directory: string): string[] => {
  const entries = readdirSync(directory, { withFileTypes: true });
  const files: string[] = [];

  for (const entry of entries) {
    const nextPath = join(directory, entry.name);

    if (entry.isDirectory()) {
      files.push(...collectComponentDocFiles(nextPath));
      continue;
    }

    if (entry.isFile() && entry.name === "content.mdx") {
      files.push(nextPath);
    }
  }

  return files;
};

const collectFenceIssues = (filePath: string): FenceIssue[] => {
  const source = readFileSync(filePath, "utf8");
  const lines = source.split(/\r?\n/u);
  const issues: FenceIssue[] = [];
  let insideFence = false;

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    if (line === undefined) {
      continue;
    }

    const trimmedLine = line.trimStart();
    if (!trimmedLine.startsWith("```")) {
      continue;
    }

    const fenceDescriptor = trimmedLine.slice(3).trim();

    if (!insideFence) {
      if (fenceDescriptor.length === 0) {
        issues.push({
          file: relative(WEBSITE_DIRECTORY, filePath),
          line: index + 1,
          message: "Code fence is missing an explicit language label.",
        });
      } else if (resolveCodeFenceLanguage(fenceDescriptor) === null) {
        issues.push({
          file: relative(WEBSITE_DIRECTORY, filePath),
          line: index + 1,
          message: `Unsupported code fence language: ${fenceDescriptor}`,
        });
      }
    }

    insideFence = !insideFence;
  }

  if (insideFence) {
    issues.push({
      file: relative(WEBSITE_DIRECTORY, filePath),
      line: lines.length,
      message: "Code fence is not closed.",
    });
  }

  return issues;
};

test("component docs code fences use shiki-compatible language labels", () => {
  const docsFiles = collectComponentDocFiles(COMPONENTS_DOCS_DIRECTORY);
  const issues: FenceIssue[] = [];

  for (const docsFile of docsFiles) {
    issues.push(...collectFenceIssues(docsFile));
  }

  expect(docsFiles.length).toBeGreaterThan(0);
  expect(issues).toEqual([]);
});

test("docs fence resolver follows @kuzenbo/code canonical language mapping", () => {
  expect(resolveCodeFenceLanguage("npm")).toBe("bash");
  expect(resolveCodeFenceLanguage("typescript meta=example")).toBe(
    "typescript"
  );
  expect(resolveCodeFenceLanguage("unsupported-language")).toBeNull();
});
