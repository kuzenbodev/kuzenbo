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
  variant: "default",
  size: "md",
});

const useAccordionContext = () => useContext(AccordionContext);

export { AccordionContext, useAccordionContext };
