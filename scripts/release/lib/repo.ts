import path from "node:path";
import { fileURLToPath } from "node:url";

const CURRENT_FILE_DIR = path.dirname(fileURLToPath(import.meta.url));

export const REPO_ROOT = path.resolve(CURRENT_FILE_DIR, "../../..");
export const PACKAGES_DIR = path.join(REPO_ROOT, "packages");
export const BUN_LOCK_PATH = path.join(REPO_ROOT, "bun.lock");
export const RELEASE_CONFIG_PATH = path.join(
  REPO_ROOT,
  "scripts",
  "release",
  "release.config.json"
);
export const WORKFLOWS_DIR = path.join(REPO_ROOT, ".github", "workflows");
