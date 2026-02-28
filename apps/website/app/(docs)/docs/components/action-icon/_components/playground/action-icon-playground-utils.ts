import type { ActionIconProps } from "@kuzenbo/core/ui/action-icon";

export type ActionIconVariant = NonNullable<ActionIconProps["variant"]>;
export type ActionIconSize = NonNullable<ActionIconProps["size"]>;

const ACTION_ICON_VARIANTS = new Set<ActionIconVariant>([
  "default",
  "outline",
  "secondary",
  "ghost",
  "danger",
  "link",
]);

const ACTION_ICON_SIZES = new Set<ActionIconSize>([
  "xs",
  "sm",
  "md",
  "lg",
  "xl",
]);

export const resolveActionIconVariant = (
  value: string,
  fallback: ActionIconVariant = "default"
): ActionIconVariant =>
  ACTION_ICON_VARIANTS.has(value as ActionIconVariant)
    ? (value as ActionIconVariant)
    : fallback;

export const resolveActionIconSize = (
  value: string,
  fallback: ActionIconSize = "md"
): ActionIconSize =>
  ACTION_ICON_SIZES.has(value as ActionIconSize)
    ? (value as ActionIconSize)
    : fallback;
