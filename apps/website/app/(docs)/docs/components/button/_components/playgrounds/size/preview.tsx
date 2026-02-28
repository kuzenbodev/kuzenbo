"use client";

import { Button } from "@kuzenbo/core/ui/button";

import {
  resolveButtonVariant,
  resolveTextButtonSize,
} from "../shared/button-playground-utils";
import type { State } from "./controls";

export const Preview = ({
  children,
  disabled,
  isLoading,
  size,
  variant,
}: State) => (
  <Button
    disabled={disabled}
    isLoading={isLoading}
    size={resolveTextButtonSize(size)}
    variant={resolveButtonVariant(variant)}
  >
    {children}
  </Button>
);
