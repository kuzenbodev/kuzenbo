"use client";

import { createContext } from "react";

import type { InputSize } from "../input/input";

export interface DropdownMenuContextValue {
  size?: InputSize;
}

const DropdownMenuContext = createContext<DropdownMenuContextValue>({
  size: "md",
});

export { DropdownMenuContext };
