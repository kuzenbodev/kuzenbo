"use client";

import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion";
import { tv } from "tailwind-variants";

import { mergeBaseUIClassName } from "../../utils/merge-base-ui-class-name";
import { useAccordionContext } from "./accordion-context";

export type AccordionItemProps = AccordionPrimitive.Item.Props;

const accordionItemVariants = tv({
  base: "border-border border-b [&:last-child]:border-b-0",
  compoundVariants: [
    {
      class: "px-2.5",
      size: "xs",
      variant: ["bordered", "ghost"],
    },
    {
      class: "px-3",
      size: "sm",
      variant: ["bordered", "ghost"],
    },
    {
      class: "px-4",
      size: "md",
      variant: ["bordered", "ghost"],
    },
    {
      class: "px-5",
      size: "lg",
      variant: ["bordered", "ghost"],
    },
    {
      class: "px-6",
      size: "xl",
      variant: ["bordered", "ghost"],
    },
  ],
  defaultVariants: {
    size: "md",
    variant: "default",
  },
  variants: {
    size: {
      lg: "",
      md: "",
      sm: "",
      xl: "",
      xs: "",
    },
    variant: {
      bordered: "",
      default: "",
      ghost: "border-0",
    },
  },
});

const AccordionItem = ({ className, ...props }: AccordionItemProps) => {
  const { size, variant } = useAccordionContext();

  return (
    <AccordionPrimitive.Item
      className={mergeBaseUIClassName<AccordionPrimitive.Item.State>(
        accordionItemVariants({ size, variant }),
        className
      )}
      data-slot="accordion-item"
      {...props}
    />
  );
};

export { AccordionItem };
