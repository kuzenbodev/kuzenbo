"use client";

import { SearchIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Button } from "@kuzenbo/core/ui/button";

import {
  resolveButtonVariant,
  resolveIconButtonSize,
} from "../shared/button-playground-utils";
import type { State } from "./controls";

export const Preview = ({ disabled, isLoading, size, variant }: State) => (
  <Button
    aria-label="Search"
    disabled={disabled}
    isLoading={isLoading}
    size={resolveIconButtonSize(size)}
    variant={resolveButtonVariant(variant)}
  >
    <HugeiconsIcon icon={SearchIcon} />
  </Button>
);
