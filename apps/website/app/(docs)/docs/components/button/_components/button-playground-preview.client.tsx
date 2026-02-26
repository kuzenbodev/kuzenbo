"use client";

import { Button } from "@kuzenbo/core/ui/button";

import type { ButtonPlaygroundState } from "./button-playground.definition";

export const ButtonPlaygroundPreview = ({
  disabled,
  fullWidth,
  isLoading,
  label,
  size,
  variant,
}: ButtonPlaygroundState) => (
  <div className={fullWidth ? "w-full max-w-sm" : "w-auto"}>
    <Button
      className={fullWidth ? "w-full" : undefined}
      disabled={disabled}
      isLoading={isLoading}
      size={size}
      variant={variant}
    >
      {label}
    </Button>
  </div>
);
