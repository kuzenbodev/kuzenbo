"use client";

import { createContext } from "react";

import type { InputSize } from "../input/input";

export interface MenubarOverlayContextValue {
  size?: InputSize;
}

const MenubarOverlayContext = createContext<MenubarOverlayContextValue>({});

export { MenubarOverlayContext };
