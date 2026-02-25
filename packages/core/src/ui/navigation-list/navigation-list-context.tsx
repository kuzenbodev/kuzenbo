"use client";

import { createContext, useContext } from "react";

import type { UISize } from "../shared/size/size-system";

export type NavigationListTone = "surface" | "sidebar";
export type NavigationListVariant = "subtle" | "light" | "filled";

export interface NavigationListContextValue {
  size?: UISize;
  tone?: NavigationListTone;
  variant?: NavigationListVariant;
}

const NavigationListContext = createContext<NavigationListContextValue>({
  size: "md",
  tone: "surface",
  variant: "light",
});

const resolveCandidate = <T,>(
  fallback: T,
  contextValue: T | undefined,
  candidates: (T | null | undefined)[]
): T => {
  for (const candidate of candidates) {
    if (candidate !== undefined && candidate !== null) {
      return candidate;
    }
  }

  return contextValue ?? fallback;
};

const useResolvedNavigationListTone = (
  ...candidates: (NavigationListTone | null | undefined)[]
): NavigationListTone => {
  const { tone } = useContext(NavigationListContext);

  return resolveCandidate("surface", tone, candidates);
};

const useResolvedNavigationListVariant = (
  ...candidates: (NavigationListVariant | null | undefined)[]
): NavigationListVariant => {
  const { variant } = useContext(NavigationListContext);

  return resolveCandidate("light", variant, candidates);
};

const useResolvedNavigationListSize = (
  ...candidates: (UISize | null | undefined)[]
): UISize => {
  const { size } = useContext(NavigationListContext);

  return resolveCandidate("md", size, candidates);
};

export {
  NavigationListContext,
  useResolvedNavigationListSize,
  useResolvedNavigationListTone,
  useResolvedNavigationListVariant,
};
