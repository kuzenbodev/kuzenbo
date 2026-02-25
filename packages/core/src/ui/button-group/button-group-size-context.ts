"use client";

import { createContext } from "react";

import type { UISize } from "../shared/size/size-system";

export interface ButtonGroupSizeContextValue {
  size?: UISize;
}

const ButtonGroupSizeContext = createContext<ButtonGroupSizeContextValue>({
  size: undefined,
});

export { ButtonGroupSizeContext };
