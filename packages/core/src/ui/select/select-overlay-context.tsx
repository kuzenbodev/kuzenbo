"use client";

import { createContext } from "react";

import type { InputSize } from "../input/input";

export interface SelectOverlayContextValue {
  size?: InputSize;
}

const SelectOverlayContext = createContext<SelectOverlayContextValue>({
  size: "md",
});

export { SelectOverlayContext };
