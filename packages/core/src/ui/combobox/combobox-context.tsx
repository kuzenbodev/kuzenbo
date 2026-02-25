import { createContext } from "react";

import type { InputSize } from "../input/input";

export interface ComboboxContextValue {
  size?: InputSize;
}

const ComboboxContext = createContext<ComboboxContextValue>({
  size: "md",
});

export { ComboboxContext };
