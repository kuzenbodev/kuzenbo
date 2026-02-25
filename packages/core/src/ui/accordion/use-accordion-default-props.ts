import type { AccordionProps } from "./accordion";

import { useComponentDefaultProps } from "../shared/size/size-provider";

export const useAccordionDefaultProps = (
  incomingProps: AccordionProps
): AccordionProps =>
  useComponentDefaultProps<AccordionProps>("Accordion", {}, incomingProps);
