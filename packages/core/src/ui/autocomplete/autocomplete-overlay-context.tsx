"use client";

import { createContext } from "react";

import type { InputSize } from "../input/input";

export interface AutocompleteOverlayContextValue {
  size?: InputSize;
}

const AutocompleteOverlayContext =
  createContext<AutocompleteOverlayContextValue>({
    size: "md",
  });

export { AutocompleteOverlayContext };
