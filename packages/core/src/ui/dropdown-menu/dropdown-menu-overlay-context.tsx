"use client";

import { createContext } from "react";

import type { InputSize } from "../input/input";

export interface DropdownMenuOverlayContextValue {
  size?: InputSize;
}

const DropdownMenuOverlayContext =
  createContext<DropdownMenuOverlayContextValue>({});

export { DropdownMenuOverlayContext };
