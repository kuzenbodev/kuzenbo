"use client";

import { createContext } from "react";

import type { InputSize } from "../input/input";

export interface InputGroupContextValue {
  size?: InputSize;
}

const InputGroupContext = createContext<InputGroupContextValue>({
  size: "md",
});

export { InputGroupContext };
