import { createContext } from "react";

import type { InputSize } from "../input/input";

export interface MenubarContextValue {
  size?: InputSize;
}

const MenubarContext = createContext<MenubarContextValue>({
  size: "md",
});

export { MenubarContext };
