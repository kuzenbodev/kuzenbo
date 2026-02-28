import fs from "node:fs";
import path from "node:path";

import { PACKAGES_DIR } from "./repo";
import type {
  DependencyField,
  PackageJsonManifest,
  WorkspacePackage,
} from "./types";

const DEPENDENCY_FIELDS: DependencyField[] = [
  "dependencies",
  "devDependencies",
  "peerDependencies",
  "optionalDependencies",
];

const INTERNAL_VERSION_REGEX = /\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?/;

const toPrettyVersionMatrix = (packages: WorkspacePackage[]): string =>
  packages
    .map((pkg) => `${pkg.manifest.name}@${pkg.manifest.version}`)
    .toSorted((a, b) => a.localeCompare(b))
    .join(", ");

const readManifest = (manifestPath: string): PackageJsonManifest => {
  const raw = fs.readFileSync(manifestPath, "utf8");
  const parsed = JSON.parse(raw) as PackageJsonManifest;

  if (!parsed.name || !parsed.version) {
    throw new Error(`Invalid package manifest at ${manifestPath}`);
  }

  return parsed;
};

export const readWorkspacePackages = (): WorkspacePackage[] => {
  if (!fs.existsSync(PACKAGES_DIR)) {
    throw new Error(`Packages directory not found at ${PACKAGES_DIR}`);
  }

  const entries = fs
    .readdirSync(PACKAGES_DIR, { withFileTypes: true })
    .filter((entry) => entry.isDirectory());

  return entries
    .map((entry): WorkspacePackage | null => {
      const dirPath = path.join(PACKAGES_DIR, entry.name);
      const manifestPath = path.join(dirPath, "package.json");
      if (!fs.existsSync(manifestPath)) {
        return null;
      }

      const manifest = readManifest(manifestPath);
      return { dirPath, manifestPath, manifest };
    })
    .filter((pkg): pkg is WorkspacePackage => pkg !== null)
    .toSorted((a, b) => a.manifest.name.localeCompare(b.manifest.name));
};

export const assertLockstep = (packages: WorkspacePackage[]): string => {
  const versions = new Set(packages.map((pkg) => pkg.manifest.version));

  if (versions.size !== 1) {
    throw new Error(
      `Lockstep version mismatch detected across packages: ${toPrettyVersionMatrix(packages)}`
    );
  }

  const [version] = [...versions];
  if (!version) {
    throw new Error("Unable to determine lockstep version");
  }

  return version;
};

export const writeWorkspacePackages = (packages: WorkspacePackage[]): void => {
  for (const pkg of packages) {
    const nextContent = `${JSON.stringify(pkg.manifest, null, 2)}\n`;
    fs.writeFileSync(pkg.manifestPath, nextContent, "utf8");
  }
};

const updateInternalRange = (range: string, nextVersion: string): string => {
  if (range.startsWith("workspace:")) {
    return range;
  }

  if (range.startsWith("^")) {
    return `^${nextVersion}`;
  }

  if (range.startsWith("~")) {
    return `~${nextVersion}`;
  }

  if (INTERNAL_VERSION_REGEX.test(range)) {
    return range.replace(INTERNAL_VERSION_REGEX, nextVersion);
  }

  return range;
};

const updateInternalDependencyRanges = (
  pkg: WorkspacePackage,
  nextVersion: string,
  internalPackageNames: Set<string>
): void => {
  for (const field of DEPENDENCY_FIELDS) {
    const group = pkg.manifest[field];
    if (!group) {
      continue;
    }

    for (const dependencyName of Object.keys(group)) {
      if (!internalPackageNames.has(dependencyName)) {
        continue;
      }

      const currentRange = group[dependencyName];
      if (typeof currentRange !== "string") {
        continue;
      }

      group[dependencyName] = updateInternalRange(currentRange, nextVersion);
    }
  }
};

export const setLockstepVersion = (
  packages: WorkspacePackage[],
  nextVersion: string
): void => {
  const internalPackageNames = new Set(
    packages.map((pkg) => pkg.manifest.name)
  );

  for (const pkg of packages) {
    pkg.manifest.version = nextVersion;
    updateInternalDependencyRanges(pkg, nextVersion, internalPackageNames);
  }
};

export const getPackageByName = (
  packages: WorkspacePackage[],
  packageName: string
): WorkspacePackage | undefined =>
  packages.find((pkg) => pkg.manifest.name === packageName);

export const assertPackagesExist = (
  packages: WorkspacePackage[],
  expectedNames: string[],
  label: string
): void => {
  for (const expectedName of expectedNames) {
    if (!getPackageByName(packages, expectedName)) {
      throw new Error(
        `${label} package not found in workspace: ${expectedName}`
      );
    }
  }
};
