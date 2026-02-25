"use client";

import { createContext } from "react";

import type { InputSize } from "../input/input";

interface InputOTPContextValue {
  size: InputSize;
}

const InputOTPContext = createContext<InputOTPContextValue>({
  size: "md",
});

export { InputOTPContext };
