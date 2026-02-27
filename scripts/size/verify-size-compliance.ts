import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const repoRoot = process.cwd();

const SCOPED_DIRS = [
  "packages/core/src/ui",
  "packages/date/src/components",
  "packages/notifications/src/ui/toast",
  "packages/tiptap/src/ui/tiptap-editor",
  "packages/charts/src/ui/primitives/legend",
  "packages/charts/src/ui/primitives/tooltip",
  "apps/website/app/(docs)/docs/components",
  "_internal_docs",
] as const;

const SOURCE_FILE_PATTERN = /\.(ts|tsx|mdx)$/;
const STORY_OR_TEST_PATTERN = /\.(test|stories)\.tsx$|story-shared\.tsx$/;
const SIZE_PROP_PATTERN = /\bsize\?:\s*(UISize|InputSize|TiptapEditorSize)\b/;
const DATA_SLOT_PATTERN = /data-slot\s*=/;
const DATA_SIZE_PATTERN = /data-size\s*=/;
const XXL_PATTERN = /\bxxl\b|size="xxl"|icon-xxl/;
const DEFAULT_SIZE_PATTERN = /size="default"/;

const listFiles = (dir: string): string[] => {
  const entries = readdirSync(dir);
  const files: string[] = [];

  for (const entry of entries) {
    const absolutePath = join(dir, entry);
    const stats = statSync(absolutePath);

    if (stats.isDirectory()) {
      files.push(...listFiles(absolutePath));
      continue;
    }

    if (SOURCE_FILE_PATTERN.test(absolutePath)) {
      files.push(absolutePath);
    }
  }

  return files;
};

const scopedFiles = SCOPED_DIRS.flatMap((scopedDir) =>
  listFiles(join(repoRoot, scopedDir))
);

const xxlViolations: string[] = [];
const defaultSizeViolations: string[] = [];
const missingDataSizeViolations: string[] = [];

for (const absolutePath of scopedFiles) {
  const relativePath = relative(repoRoot, absolutePath);
  const source = readFileSync(absolutePath, "utf8");

  if (XXL_PATTERN.test(source)) {
    xxlViolations.push(relativePath);
  }

  if (DEFAULT_SIZE_PATTERN.test(source)) {
    defaultSizeViolations.push(relativePath);
  }

  if (
    absolutePath.endsWith(".tsx") &&
    !STORY_OR_TEST_PATTERN.test(absolutePath) &&
    SIZE_PROP_PATTERN.test(source) &&
    DATA_SLOT_PATTERN.test(source) &&
    !DATA_SIZE_PATTERN.test(source)
  ) {
    missingDataSizeViolations.push(relativePath);
  }
}

const formatViolations = (label: string, violations: string[]) => {
  if (violations.length === 0) {
    return;
  }

  console.error(`\n${label}:`);
  for (const violation of violations) {
    console.error(`- ${violation}`);
  }
};

if (
  xxlViolations.length > 0 ||
  defaultSizeViolations.length > 0 ||
  missingDataSizeViolations.length > 0
) {
  console.error("Size compliance verification failed.");
  formatViolations("Found forbidden xxl usage", xxlViolations);
  formatViolations(
    'Found forbidden size="default" usage',
    defaultSizeViolations
  );
  formatViolations(
    "Size-aware slot owners missing data-size",
    missingDataSizeViolations
  );
  process.exit(1);
}

console.log(
  `Size compliance verification passed across ${scopedFiles.length} files.`
);
