"use client";

import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion";

import { mergeBaseUIClassName } from "../../utils/merge-base-ui-class-name";
export type AccordionHeaderProps = AccordionPrimitive.Header.Props;

const AccordionHeader = ({ className, ...props }: AccordionHeaderProps) => (
  <AccordionPrimitive.Header
    className={mergeBaseUIClassName<AccordionPrimitive.Item.State>(
      "flex",
      className
    )}
    data-slot="accordion-header"
    {...props}
  />
);

export { AccordionHeader };
