import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { runCommand, runStreamingCommand } from "./shell";
import type {
  DependencyField,
  PackageJsonManifest,
  WorkspacePackage,
} from "./types";

const UNSUPPORTED_DEPENDENCY_PROTOCOL_PREFIXES = [
  "catalog:",
  "workspace:",
] as const;
const DEPENDENCY_FIELDS: DependencyField[] = [
  "dependencies",
  "devDependencies",
  "peerDependencies",
  "optionalDependencies",
];
const MANIFEST_PATH_INSIDE_TARBALL = "package/package.json";
const PUBLISH_CONFIG_MANIFEST_KEYS = [
  "main",
  "module",
  "types",
  "exports",
] as const;

export interface UnsupportedDependencyProtocolMatch {
  field: DependencyField;
  dependencyName: string;
  specifier: string;
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const sanitizeTarballSegment = (value: string): string =>
  value
    .trim()
    .replaceAll(/[^a-zA-Z0-9._-]+/g, "-")
    .replaceAll(/-+/g, "-")
    .replaceAll(/^-|-$/g, "");

export const buildTarballFilename = (
  packageName: string,
  version: string
): string => {
  const nameParts = packageName.split("/");
  const inferredPackageSegment = nameParts[1] ?? packageName.replace(/^@/, "");
  const packageSegment = sanitizeTarballSegment(inferredPackageSegment);
  const versionSegment = sanitizeTarballSegment(version);

  return `kuzenbo-${packageSegment}-${versionSegment}.tgz`;
};

export const findUnsupportedDependencyProtocols = (
  manifest: PackageJsonManifest
): UnsupportedDependencyProtocolMatch[] => {
  const matches: UnsupportedDependencyProtocolMatch[] = [];

  for (const field of DEPENDENCY_FIELDS) {
    const group = manifest[field];
    if (!group) {
      continue;
    }

    for (const [dependencyName, specifier] of Object.entries(group)) {
      const usesUnsupportedProtocol =
        UNSUPPORTED_DEPENDENCY_PROTOCOL_PREFIXES.some((prefix) =>
          specifier.startsWith(prefix)
        );
      if (!usesUnsupportedProtocol) {
        continue;
      }

      matches.push({
        dependencyName,
        field,
        specifier,
      });
    }
  }

  return matches;
};

export const applyPublishConfigManifestOverrides = (
  manifest: PackageJsonManifest
): PackageJsonManifest => {
  const { publishConfig } = manifest;
  if (!isRecord(publishConfig)) {
    return manifest;
  }

  const nextManifest = { ...manifest };
  let hasOverrides = false;

  for (const key of PUBLISH_CONFIG_MANIFEST_KEYS) {
    if (!(key in publishConfig)) {
      continue;
    }
    const overrideValue = publishConfig[key];
    if (overrideValue === undefined) {
      continue;
    }

    nextManifest[key] = overrideValue;
    hasOverrides = true;
  }

  return hasOverrides ? nextManifest : manifest;
};

const rewritePackedManifestWithPublishConfig = (tarballPath: string): void => {
  const extractionDir = fs.mkdtempSync(
    path.join(os.tmpdir(), "kuzenbo-release-manifest-")
  );

  try {
    runStreamingCommand("tar", ["-xzf", tarballPath, "-C", extractionDir]);

    const packedManifestPath = path.join(
      extractionDir,
      "package",
      "package.json"
    );
    if (!fs.existsSync(packedManifestPath)) {
      throw new Error(
        `Packed tarball is missing package.json: ${MANIFEST_PATH_INSIDE_TARBALL}`
      );
    }

    const originalManifest = JSON.parse(
      fs.readFileSync(packedManifestPath, "utf8")
    ) as PackageJsonManifest;
    const rewrittenManifest =
      applyPublishConfigManifestOverrides(originalManifest);

    if (rewrittenManifest === originalManifest) {
      return;
    }

    fs.writeFileSync(
      packedManifestPath,
      `${JSON.stringify(rewrittenManifest, null, 2)}\n`
    );

    runStreamingCommand("tar", [
      "-czf",
      tarballPath,
      "-C",
      extractionDir,
      "package",
    ]);
  } finally {
    fs.rmSync(extractionDir, { force: true, recursive: true });
  }
};

const readTarballFiles = (tarballPath: string): string[] =>
  runCommand("tar", ["-tf", tarballPath])
    .split("\n")
    .map((entry) => entry.trim())
    .filter((entry) => entry.length > 0)
    .map((entry) => entry.replace(/^package\//, ""));

const escapeRegex = (value: string): string =>
  value.replaceAll(/[|\\{}()[\]^$+?.]/g, "\\$&");

const collectManifestPathReferences = (
  value: unknown,
  references: Set<string>
): void => {
  if (typeof value === "string") {
    references.add(value);
    return;
  }

  if (Array.isArray(value)) {
    for (const item of value) {
      collectManifestPathReferences(item, references);
    }
    return;
  }

  if (isRecord(value)) {
    for (const item of Object.values(value)) {
      collectManifestPathReferences(item, references);
    }
  }
};

export const findMissingPackedManifestFileReferences = (
  manifest: PackageJsonManifest,
  tarballFiles: string[]
): string[] => {
  const references = new Set<string>();

  for (const field of ["main", "module", "types"] as const) {
    if (typeof manifest[field] === "string") {
      references.add(manifest[field]);
    }
  }

  collectManifestPathReferences(manifest.exports, references);

  const missing: string[] = [];
  const fileSet = new Set(tarballFiles);

  for (const reference of references) {
    if (!reference.startsWith("./")) {
      continue;
    }

    const normalizedReference = reference.replace(/^\.\//, "");
    if (
      normalizedReference.length === 0 ||
      normalizedReference === "package.json"
    ) {
      continue;
    }

    if (normalizedReference.includes("*")) {
      const globRegex = new RegExp(
        `^${escapeRegex(normalizedReference).replaceAll("*", ".*")}$`
      );
      const hasMatch = tarballFiles.some((file) => globRegex.test(file));
      if (!hasMatch) {
        missing.push(reference);
      }
      continue;
    }

    if (!fileSet.has(normalizedReference)) {
      missing.push(reference);
    }
  }

  return missing;
};

export const packWorkspacePackageToTarball = (
  pkg: WorkspacePackage,
  destinationDir: string
): string => {
  const packageOutputDirectory = path.join(
    destinationDir,
    sanitizeTarballSegment(
      pkg.manifest.name.replace(/^@/, "").replace("/", "-")
    )
  );
  fs.mkdirSync(packageOutputDirectory, { recursive: true });
  const tarballFilename = buildTarballFilename(
    pkg.manifest.name,
    pkg.manifest.version
  );
  const tarballPath = path.join(destinationDir, tarballFilename);

  runStreamingCommand(
    "bun",
    ["pm", "pack", "--destination", packageOutputDirectory, "--quiet"],
    { cwd: pkg.dirPath }
  );

  const generatedTarballs = fs
    .readdirSync(packageOutputDirectory)
    .filter((fileName) => fileName.endsWith(".tgz"));
  if (generatedTarballs.length !== 1) {
    throw new Error(
      `Expected exactly one packed tarball for ${pkg.manifest.name}, found ${generatedTarballs.length}`
    );
  }
  const [generatedTarballName] = generatedTarballs;
  if (!generatedTarballName) {
    throw new Error(
      `Packed tarball name could not be resolved for ${pkg.manifest.name}`
    );
  }

  const generatedTarballPath = path.join(
    packageOutputDirectory,
    generatedTarballName
  );
  fs.mkdirSync(destinationDir, { recursive: true });
  fs.renameSync(generatedTarballPath, tarballPath);
  fs.rmSync(packageOutputDirectory, { force: true, recursive: true });

  if (!fs.existsSync(tarballPath)) {
    throw new Error(
      `Tarball was not generated for ${pkg.manifest.name}: ${tarballPath}`
    );
  }

  rewritePackedManifestWithPublishConfig(tarballPath);

  return tarballPath;
};

export const readPackedPackageManifest = (
  tarballPath: string
): PackageJsonManifest => {
  const packageJsonContent = runCommand("tar", [
    "-xOf",
    tarballPath,
    MANIFEST_PATH_INSIDE_TARBALL,
  ]);
  const manifest = JSON.parse(packageJsonContent) as PackageJsonManifest;

  if (!manifest.name || !manifest.version) {
    throw new Error(
      `Packed manifest is invalid or missing required fields in tarball: ${tarballPath}`
    );
  }

  return manifest;
};

export const assertPackedManifestIsPublishSafe = (
  manifest: PackageJsonManifest,
  packageName: string,
  tarballPath?: string
): void => {
  const unsupportedMatches = findUnsupportedDependencyProtocols(manifest);
  if (unsupportedMatches.length > 0) {
    const details = unsupportedMatches
      .map(
        (match) => `${match.field}.${match.dependencyName}=${match.specifier}`
      )
      .join(", ");

    throw new Error(
      `Packed manifest for ${packageName} contains unsupported dependency protocols: ${details}. Run \`bun install\` to refresh lockfile metadata and retry.`
    );
  }

  if (!tarballPath) {
    return;
  }

  const tarballFiles = readTarballFiles(tarballPath);
  const missingReferences = findMissingPackedManifestFileReferences(
    manifest,
    tarballFiles
  );
  if (missingReferences.length === 0) {
    return;
  }

  throw new Error(
    `Packed manifest for ${packageName} references files missing from tarball: ${missingReferences.join(", ")}`
  );
};
