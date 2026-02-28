import type { ComponentType, ReactNode } from "react";

// Format: { THEME_NAME: CSS_SELECTOR }
export const THEMES = { dark: ".dark", light: "" } as const;

export type ChartConfig = Record<
  string,
  {
    label?: ReactNode;
    icon?: ComponentType;
  } & (
    | { color?: string; theme?: never }
    | { color?: never; theme: Record<keyof typeof THEMES, string> }
  )
>;
