"use client";

import { createContext } from "react";

import type { InputSize } from "../input/input";

export interface SidebarMenuContextValue {
  size?: InputSize;
}

const SidebarMenuContext = createContext<SidebarMenuContextValue>({
  size: "md",
});

export { SidebarMenuContext };
