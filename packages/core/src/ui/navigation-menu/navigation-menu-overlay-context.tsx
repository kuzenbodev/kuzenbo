import { createContext } from "react";

import type { InputSize } from "../input/input";

export interface NavigationMenuOverlayContextValue {
  size?: InputSize;
}

const NavigationMenuOverlayContext =
  createContext<NavigationMenuOverlayContextValue>({});

export { NavigationMenuOverlayContext };
