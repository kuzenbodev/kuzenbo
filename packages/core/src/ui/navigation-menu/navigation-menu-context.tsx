import { createContext } from "react";

import type { InputSize } from "../input/input";

export interface NavigationMenuContextValue {
  size?: InputSize;
}

const NavigationMenuContext = createContext<NavigationMenuContextValue>({
  size: "md",
});

export { NavigationMenuContext };
