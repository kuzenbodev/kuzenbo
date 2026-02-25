"use client";

import { createContext } from "react";

import type { InputSize } from "../input/input";

export interface NumberFieldContextValue {
  size?: InputSize;
}

const NumberFieldContext = createContext<NumberFieldContextValue>({
  size: "md",
});

export { NumberFieldContext };
