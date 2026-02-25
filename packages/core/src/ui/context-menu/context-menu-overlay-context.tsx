import { createContext } from "react";

import type { InputSize } from "../input/input";

export interface ContextMenuOverlayContextValue {
  size?: InputSize;
}

const ContextMenuOverlayContext = createContext<ContextMenuOverlayContextValue>(
  {}
);

export { ContextMenuOverlayContext };
