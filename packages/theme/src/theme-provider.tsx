"use client";

import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps as NextThemesProviderProps,
} from "next-themes";

import { DEFAULT_THEME_SETTING, THEME_STORAGE_KEY } from "./theme-bootstrap";

export type ThemeProviderProps = NextThemesProviderProps;

export const ThemeProvider = ({ children, ...props }: ThemeProviderProps) => (
  <NextThemesProvider
    attribute="class"
    defaultTheme={DEFAULT_THEME_SETTING}
    disableTransitionOnChange
    enableSystem
    storageKey={THEME_STORAGE_KEY}
    {...props}
  >
    {children}
  </NextThemesProvider>
);
