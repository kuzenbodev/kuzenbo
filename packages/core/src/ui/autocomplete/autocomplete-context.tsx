import { createContext } from "react";

import type { InputSize } from "../input/input";

export interface AutocompleteContextValue {
  size?: InputSize;
}

const AutocompleteContext = createContext<AutocompleteContextValue>({
  size: "md",
});

export { AutocompleteContext };
