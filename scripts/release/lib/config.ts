import fs from "node:fs";

import { RELEASE_CONFIG_PATH } from "./repo";
import { RELEASE_CHANNELS, type ReleaseConfig } from "./types";

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

export const loadReleaseConfig = (): ReleaseConfig => {
  if (!fs.existsSync(RELEASE_CONFIG_PATH)) {
    throw new Error(`Release config not found at ${RELEASE_CONFIG_PATH}`);
  }

  const raw = fs.readFileSync(RELEASE_CONFIG_PATH, "utf8");
  const parsed = JSON.parse(raw) as unknown;

  if (!isRecord(parsed)) {
    throw new Error("Release config must be an object");
  }

  const config = parsed as unknown as ReleaseConfig;

  if (!config.lockstepScope) {
    throw new Error("Release config requires lockstepScope");
  }

  if (
    !Array.isArray(config.publishAllowlist) ||
    config.publishAllowlist.length === 0
  ) {
    throw new Error("Release config requires a non-empty publishAllowlist");
  }

  if (!Array.isArray(config.publishBlocked)) {
    throw new TypeError("Release config requires publishBlocked array");
  }

  if (!Array.isArray(config.neverPublish)) {
    throw new TypeError("Release config requires neverPublish array");
  }

  if (
    !Array.isArray(config.requiredQualityCommands) ||
    config.requiredQualityCommands.length === 0
  ) {
    throw new TypeError(
      "Release config requires non-empty requiredQualityCommands array"
    );
  }

  for (const command of config.requiredQualityCommands) {
    if (typeof command !== "string" || command.trim().length === 0) {
      throw new TypeError(
        "Release config requiredQualityCommands entries must be non-empty strings"
      );
    }
  }

  for (const channel of RELEASE_CHANNELS) {
    const releaseBranch = config.releaseBranches?.[channel];
    if (
      typeof releaseBranch !== "string" ||
      releaseBranch.trim().length === 0
    ) {
      throw new Error(`Missing releaseBranches mapping for ${channel}`);
    }

    if (!config.channelToDistTag?.[channel]) {
      throw new Error(`Missing channelToDistTag mapping for ${channel}`);
    }
  }

  if (config.releaseBranches.stable !== "main") {
    throw new Error(
      "Release config requires releaseBranches.stable to equal main"
    );
  }

  if (config.releaseBranches.next !== "main") {
    throw new Error(
      "Release config requires releaseBranches.next to equal main"
    );
  }

  if (!config.trustedPublish?.workflowFile) {
    throw new Error("Release config requires trustedPublish.workflowFile");
  }

  if (!config.trustedPublish?.environmentName) {
    throw new Error("Release config requires trustedPublish.environmentName");
  }

  return config;
};
