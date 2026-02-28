import { useComponentDefaultProps } from "../shared/size/size-provider";
import type { AccordionProps } from "./accordion";

export const useAccordionDefaultProps = (
  incomingProps: AccordionProps
): AccordionProps =>
  useComponentDefaultProps<AccordionProps>("Accordion", {}, incomingProps);
