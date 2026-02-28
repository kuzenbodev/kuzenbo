"use client";

import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion";
import { tv } from "tailwind-variants";

import { mergeBaseUIClassName } from "../../utils/merge-base-ui-class-name";
import { useAccordionContext } from "./accordion-context";

export type AccordionContentProps = AccordionPrimitive.Panel.Props;

const accordionContentVariants = tv({
  base: "overflow-hidden text-sm transition-[height,width] ease-out data-[orientation=horizontal]:w-[var(--accordion-panel-width)] data-[orientation=horizontal]:data-[ending-style]:w-0 data-[orientation=vertical]:h-[var(--accordion-panel-height)] data-[orientation=vertical]:data-[ending-style]:h-0 data-[orientation=horizontal]:data-[starting-style]:w-0 data-[orientation=vertical]:data-[starting-style]:h-0",
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
      ghost: "",
    },
  },
});

const accordionContentBodyVariants = tv({
  base: "[&_a]:hover:text-foreground min-w-0 [&_a]:underline [&_a]:underline-offset-3 [&_p:not(:last-child)]:mb-4",
  compoundVariants: [
    {
      class: "pt-0 pb-2",
      size: "xs",
      variant: ["default", "bordered"],
    },
    {
      class: "pt-0 pb-3",
      size: "sm",
      variant: ["default", "bordered"],
    },
    {
      class: "pt-0 pb-4",
      size: "md",
      variant: ["default", "bordered"],
    },
    {
      class: "pt-0 pb-5",
      size: "lg",
      variant: ["default", "bordered"],
    },
    {
      class: "pt-0 pb-6",
      size: "xl",
      variant: ["default", "bordered"],
    },
    {
      class: "p-2",
      size: "xs",
      variant: "ghost",
    },
    {
      class: "p-2.5",
      size: "sm",
      variant: "ghost",
    },
    {
      class: "p-3",
      size: "md",
      variant: "ghost",
    },
    {
      class: "p-4",
      size: "lg",
      variant: "ghost",
    },
    {
      class: "p-5",
      size: "xl",
      variant: "ghost",
    },
  ],
  defaultVariants: {
    size: "md",
    variant: "default",
  },
  variants: {
    size: {
      lg: "text-sm",
      md: "text-sm",
      sm: "text-sm",
      xl: "text-base",
      xs: "text-xs",
    },
    variant: {
      bordered: "",
      default: "",
      ghost: "",
    },
  },
});

const AccordionContent = ({
  className,
  children,
  ...props
}: AccordionContentProps) => {
  const { size, variant } = useAccordionContext();

  return (
    <AccordionPrimitive.Panel
      className={mergeBaseUIClassName<AccordionPrimitive.Panel.State>(
        accordionContentVariants({ size, variant }),
        className
      )}
      data-slot="accordion-content"
      {...props}
    >
      <div className={accordionContentBodyVariants({ size, variant })}>
        {children}
      </div>
    </AccordionPrimitive.Panel>
  );
};

export { AccordionContent };
