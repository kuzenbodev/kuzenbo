import type { ButtonProps } from "@kuzenbo/core/ui/button";
import type { ButtonGroupProps } from "@kuzenbo/core/ui/button-group";

export type ButtonVariant = NonNullable<ButtonProps["variant"]>;
export type ButtonSize = NonNullable<ButtonProps["size"]>;
export type ButtonGroupOrientation = NonNullable<
  ButtonGroupProps["orientation"]
>;
export type ButtonGroupSize = NonNullable<ButtonGroupProps["size"]>;

const BUTTON_VARIANTS = new Set<ButtonVariant>([
  "default",
  "outline",
  "secondary",
  "ghost",
  "danger",
  "link",
]);

const BUTTON_SIZES = new Set<ButtonSize>([
  "xs",
  "sm",
  "md",
  "lg",
  "xl",
  "icon-xs",
  "icon-sm",
  "icon",
  "icon-lg",
  "icon-xl",
]);

const TEXT_BUTTON_SIZES = new Set<ButtonSize>(["xs", "sm", "md", "lg", "xl"]);
const ICON_BUTTON_SIZES = new Set<ButtonSize>([
  "icon-xs",
  "icon-sm",
  "icon",
  "icon-lg",
  "icon-xl",
]);

const BUTTON_GROUP_ORIENTATIONS = new Set<ButtonGroupOrientation>([
  "horizontal",
  "vertical",
]);

const BUTTON_GROUP_SIZES = new Set<ButtonGroupSize>([
  "xs",
  "sm",
  "md",
  "lg",
  "xl",
]);

export const resolveButtonVariant = (
  value: string,
  fallback: ButtonVariant = "default"
): ButtonVariant =>
  BUTTON_VARIANTS.has(value as ButtonVariant)
    ? (value as ButtonVariant)
    : fallback;

export const resolveButtonSize = (
  value: string,
  fallback: ButtonSize = "md"
): ButtonSize =>
  BUTTON_SIZES.has(value as ButtonSize) ? (value as ButtonSize) : fallback;

export const resolveTextButtonSize = (
  value: string,
  fallback: ButtonSize = "md"
): ButtonSize =>
  TEXT_BUTTON_SIZES.has(value as ButtonSize) ? (value as ButtonSize) : fallback;

export const resolveIconButtonSize = (
  value: string,
  fallback: ButtonSize = "icon"
): ButtonSize =>
  ICON_BUTTON_SIZES.has(value as ButtonSize) ? (value as ButtonSize) : fallback;

export const resolveButtonGroupOrientation = (
  value: string,
  fallback: ButtonGroupOrientation = "horizontal"
): ButtonGroupOrientation =>
  BUTTON_GROUP_ORIENTATIONS.has(value as ButtonGroupOrientation)
    ? (value as ButtonGroupOrientation)
    : fallback;

export const resolveButtonGroupSize = (
  value: string,
  fallback: ButtonGroupSize = "md"
): ButtonGroupSize =>
  BUTTON_GROUP_SIZES.has(value as ButtonGroupSize)
    ? (value as ButtonGroupSize)
    : fallback;
