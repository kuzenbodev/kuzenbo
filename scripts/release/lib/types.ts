export const RELEASE_CHANNELS = ["next", "stable"] as const;
export type ReleaseChannel = (typeof RELEASE_CHANNELS)[number];

export const RELEASE_BUMPS = ["patch", "minor", "major"] as const;
export type ReleaseBump = (typeof RELEASE_BUMPS)[number];

export const RELEASE_PUBLISH_MODES = ["normal", "recovery"] as const;
export type ReleasePublishMode = (typeof RELEASE_PUBLISH_MODES)[number];

export type DependencyField =
  | "dependencies"
  | "devDependencies"
  | "peerDependencies"
  | "optionalDependencies";

export interface PackageJsonManifest {
  name: string;
  version: string;
  private?: boolean;
  scripts?: Record<string, string>;
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
  peerDependencies?: Record<string, string>;
  optionalDependencies?: Record<string, string>;
  [key: string]: unknown;
}

export interface WorkspacePackage {
  dirPath: string;
  manifestPath: string;
  manifest: PackageJsonManifest;
}

export interface ReleaseConfig {
  lockstepScope: string;
  publishAllowlist: string[];
  publishBlocked: string[];
  neverPublish: string[];
  releaseBranches: Record<ReleaseChannel, string>;
  channelToDistTag: Record<ReleaseChannel, string>;
  requiredQualityCommands: string[];
  trustedPublish: {
    workflowFile: string;
    environmentName: string;
  };
}

export interface ReleaseOptions {
  channel: ReleaseChannel;
  version: string;
  ref?: string;
}
