"use client";

import { createContext } from "react";

import type { InputSize } from "../input/input";

export interface ComboboxOverlayContextValue {
  size?: InputSize;
}

const ComboboxOverlayContext = createContext<ComboboxOverlayContextValue>({
  size: "md",
});

export { ComboboxOverlayContext };
