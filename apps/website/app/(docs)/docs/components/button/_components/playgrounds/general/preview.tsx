"use client";

import { Button } from "@kuzenbo/core/ui/button";
import type { ButtonProps } from "@kuzenbo/core/ui/button";

import type { State } from "./controls";

type ButtonVariant = NonNullable<ButtonProps["variant"]>;
type ButtonSize = Exclude<NonNullable<ButtonProps["size"]>, "icon">;

const BUTTON_VARIANTS = new Set<ButtonVariant>([
  "default",
  "outline",
  "secondary",
  "ghost",
  "danger",
  "link",
]);

const BUTTON_SIZES = new Set<ButtonSize>(["xs", "sm", "md", "lg", "xl"]);

const resolveButtonVariant = (value: string): ButtonVariant =>
  BUTTON_VARIANTS.has(value as ButtonVariant)
    ? (value as ButtonVariant)
    : "default";

const resolveButtonSize = (value: string): ButtonSize =>
  BUTTON_SIZES.has(value as ButtonSize) ? (value as ButtonSize) : "md";

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
    size={resolveButtonSize(size)}
    variant={resolveButtonVariant(variant)}
  >
    {children}
  </Button>
);
