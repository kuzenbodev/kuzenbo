"use client";

import { createContext, useContext } from "react";

import type { UISize } from "../shared/size/size-system";

export type AccordionVariant = "default" | "bordered" | "ghost";
export type AccordionSize = UISize;

interface AccordionContextValue {
  variant: AccordionVariant;
  size: AccordionSize;
}

const AccordionContext = createContext<AccordionContextValue>({
  size: "md",
  variant: "default",
});

const useAccordionContext = () => useContext(AccordionContext);

export { AccordionContext, useAccordionContext };
