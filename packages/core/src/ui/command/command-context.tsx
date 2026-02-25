import { createContext } from "react";

import type { InputSize } from "../input/input";

export interface CommandContextValue {
  size?: InputSize;
}

export interface CommandItemContextValue {
  size?: InputSize;
}

const CommandContext = createContext<CommandContextValue>({
  size: "md",
});

const CommandItemContext = createContext<CommandItemContextValue>({});

export { CommandContext, CommandItemContext };
