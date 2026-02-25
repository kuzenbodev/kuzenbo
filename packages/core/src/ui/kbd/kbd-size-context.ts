"use client";

import { createContext, useContext } from "react";

import type { UISize } from "../shared/size/size-system";

export type KbdSize = UISize;

const DEFAULT_KBD_SIZE: KbdSize = "md";

const KbdSizeContext = createContext<KbdSize>(DEFAULT_KBD_SIZE);

const useKbdResolvedSize = (size?: KbdSize): KbdSize => {
  const contextSize = useContext(KbdSizeContext);

  return size ?? contextSize ?? DEFAULT_KBD_SIZE;
};

export { KbdSizeContext, useKbdResolvedSize };
