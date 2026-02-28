export type UISize = "xs" | "sm" | "md" | "lg" | "xl";

export const UI_SIZE_ORDER: readonly UISize[] = ["xs", "sm", "md", "lg", "xl"];

export const FIELD_HEIGHT_CLASS_BY_SIZE: Record<UISize, string> = {
  lg: "h-10",
  md: "h-9",
  sm: "h-8",
  xl: "h-11",
  xs: "h-6",
};

export const ROW_HEIGHT_CLASS_BY_SIZE: Record<UISize, string> = {
  lg: "h-9",
  md: "h-8",
  sm: "h-7",
  xl: "h-10",
  xs: "h-6",
};

export const COMPACT_VISUAL_CLASS_BY_SIZE: Record<UISize, string> = {
  lg: "size-[18px]",
  md: "size-4",
  sm: "size-3.5",
  xl: "size-5",
  xs: "size-3",
};

export const COMPACT_TARGET_SIZE_BY_SIZE: Record<UISize, number> = {
  lg: 36,
  md: 32,
  sm: 28,
  xl: 40,
  xs: 24,
};

export const SURFACE_SPACING_CLASS_BY_SIZE: Record<UISize, string> = {
  lg: "p-5 gap-3.5",
  md: "p-4 gap-3",
  sm: "p-3 gap-2",
  xl: "p-6 gap-4",
  xs: "p-2 gap-1.5",
};

export const FIELD_TEXT_CLASS_BY_SIZE: Record<UISize, string> = {
  lg: "text-sm",
  md: "text-sm",
  sm: "text-sm",
  xl: "text-base",
  xs: "text-xs",
};

export const ROW_TEXT_CLASS_BY_SIZE: Record<UISize, string> = {
  lg: "text-sm",
  md: "text-sm",
  sm: "text-xs",
  xl: "text-base",
  xs: "text-xs",
};

export const DEFAULT_ICON_CLASS_BY_SIZE: Record<UISize, string> = {
  lg: "size-4",
  md: "size-4",
  sm: "size-3.5",
  xl: "size-5",
  xs: "size-3",
};

export const DEFAULT_NESTED_ICON_CLASS_BY_SIZE: Record<UISize, string> = {
  lg: "[&_svg:not([class*='size-'])]:size-4",
  md: "[&_svg:not([class*='size-'])]:size-4",
  sm: "[&_svg:not([class*='size-'])]:size-3.5",
  xl: "[&_svg:not([class*='size-'])]:size-5",
  xs: "[&_svg:not([class*='size-'])]:size-3",
};
