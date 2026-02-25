import { createContext } from "react";

import type { InputSize } from "../input/input";

export interface SelectContextValue {
  size?: InputSize;
}

const SelectContext = createContext<SelectContextValue>({
  size: "md",
});

export { SelectContext };
