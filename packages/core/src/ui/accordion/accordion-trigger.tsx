"use client";

import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion";
import { ArrowDown01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { tv } from "tailwind-variants";

import { mergeBaseUIClassName } from "../../utils/merge-base-ui-class-name";
import { useAccordionContext } from "./accordion-context";

export type AccordionTriggerProps = AccordionPrimitive.Trigger.Props;

const accordionTriggerVariants = tv({
  base: "group/accordion-trigger cursor-clickable focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:after:border-ring **:data-[slot=accordion-trigger-icon]:text-muted-foreground relative flex flex-1 items-start justify-between rounded-md border border-transparent text-left font-medium transition-all outline-none hover:underline focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 **:data-[slot=accordion-trigger-icon]:ml-auto",
  compoundVariants: [
    {
      class: "px-2",
      size: "xs",
      variant: "ghost",
    },
    {
      class: "px-2.5",
      size: "sm",
      variant: "ghost",
    },
    {
      class: "px-3",
      size: "md",
      variant: "ghost",
    },
    {
      class: "px-3.5",
      size: "lg",
      variant: "ghost",
    },
    {
      class: "px-4",
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
      lg: "min-h-11 gap-3 py-3.5 text-sm **:data-[slot=accordion-trigger-icon]:size-4",
      md: "min-h-10 gap-2.5 py-3 text-sm **:data-[slot=accordion-trigger-icon]:size-4",
      sm: "min-h-9 gap-2 py-2.5 text-sm **:data-[slot=accordion-trigger-icon]:size-3.5",
      xl: "min-h-12 gap-3.5 py-4 text-base **:data-[slot=accordion-trigger-icon]:size-5",
      xs: "min-h-8 gap-2 py-2 text-xs **:data-[slot=accordion-trigger-icon]:size-3.5",
    },
    variant: {
      bordered: "",
      default: "",
      ghost:
        "hover:bg-muted/70 data-[panel-open]:bg-muted rounded-md hover:no-underline",
    },
  },
});

const AccordionTrigger = ({
  className,
  children,
  ...props
}: AccordionTriggerProps) => {
  const { size, variant } = useAccordionContext();

  return (
    <AccordionPrimitive.Trigger
      className={mergeBaseUIClassName<AccordionPrimitive.Item.State>(
        accordionTriggerVariants({ size, variant }),
        className
      )}
      data-slot="accordion-trigger"
      {...props}
    >
      {children}
      <HugeiconsIcon
        className="pointer-events-none shrink-0 transition-transform duration-200 ease-out group-data-[panel-open]/accordion-trigger:rotate-180"
        data-slot="accordion-trigger-icon"
        icon={ArrowDown01Icon}
        strokeWidth={2}
      />
    </AccordionPrimitive.Trigger>
  );
};

export { AccordionTrigger };
