"use client";

import { SearchIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { ActionIcon } from "@kuzenbo/core/ui/action-icon";

import {
  resolveActionIconSize,
  resolveActionIconVariant,
} from "./action-icon-playground-utils";
import type { State } from "./controls";

export const Preview = ({ disabled, isLoading, size, variant }: State) => (
  <ActionIcon
    aria-label="Search"
    disabled={disabled}
    isLoading={isLoading}
    size={resolveActionIconSize(size)}
    variant={resolveActionIconVariant(variant)}
  >
    <HugeiconsIcon icon={SearchIcon} />
  </ActionIcon>
);
