"use client";

import { createContext } from "react";

import type { InputSize } from "../input/input";

export interface ContextMenuContextValue {
  size?: InputSize;
}

const ContextMenuContext = createContext<ContextMenuContextValue>({
  size: "md",
});

export { ContextMenuContext };
