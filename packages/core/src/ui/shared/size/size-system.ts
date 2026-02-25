export type UISize = "xs" | "sm" | "md" | "lg" | "xl";

export const UI_SIZE_ORDER: readonly UISize[] = ["xs", "sm", "md", "lg", "xl"];

export const FIELD_HEIGHT_CLASS_BY_SIZE: Record<UISize, string> = {
  xs: "h-6",
  sm: "h-8",
  md: "h-9",
  lg: "h-10",
  xl: "h-11",
};

export const ROW_HEIGHT_CLASS_BY_SIZE: Record<UISize, string> = {
  xs: "h-6",
  sm: "h-7",
  md: "h-8",
  lg: "h-9",
  xl: "h-10",
};

export const COMPACT_VISUAL_CLASS_BY_SIZE: Record<UISize, string> = {
  xs: "size-3",
  sm: "size-3.5",
  md: "size-4",
  lg: "size-[18px]",
  xl: "size-5",
};

export const COMPACT_TARGET_SIZE_BY_SIZE: Record<UISize, number> = {
  xs: 24,
  sm: 28,
  md: 32,
  lg: 36,
  xl: 40,
};

export const SURFACE_SPACING_CLASS_BY_SIZE: Record<UISize, string> = {
  xs: "p-2 gap-1.5",
  sm: "p-3 gap-2",
  md: "p-4 gap-3",
  lg: "p-5 gap-3.5",
  xl: "p-6 gap-4",
};

export const FIELD_TEXT_CLASS_BY_SIZE: Record<UISize, string> = {
  xs: "text-xs",
  sm: "text-sm",
  md: "text-sm",
  lg: "text-sm",
  xl: "text-base",
};

export const ROW_TEXT_CLASS_BY_SIZE: Record<UISize, string> = {
  xs: "text-xs",
  sm: "text-xs",
  md: "text-sm",
  lg: "text-sm",
  xl: "text-base",
};

export const DEFAULT_ICON_CLASS_BY_SIZE: Record<UISize, string> = {
  xs: "size-3",
  sm: "size-3.5",
  md: "size-4",
  lg: "size-4",
  xl: "size-5",
};

export const DEFAULT_NESTED_ICON_CLASS_BY_SIZE: Record<UISize, string> = {
  xs: "[&_svg:not([class*='size-'])]:size-3",
  sm: "[&_svg:not([class*='size-'])]:size-3.5",
  md: "[&_svg:not([class*='size-'])]:size-4",
  lg: "[&_svg:not([class*='size-'])]:size-4",
  xl: "[&_svg:not([class*='size-'])]:size-5",
};
