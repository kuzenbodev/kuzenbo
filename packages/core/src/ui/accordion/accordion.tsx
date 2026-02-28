"use client";

import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion";
import { useMemo } from "react";
import { tv, type VariantProps } from "tailwind-variants";

import { mergeBaseUIClassName } from "../../utils/merge-base-ui-class-name";
import { useComponentSize } from "../shared/size/size-provider";
import type { UISize } from "../shared/size/size-system";
import { AccordionContent } from "./accordion-content";
import { AccordionContext } from "./accordion-context";
import { AccordionHeader } from "./accordion-header";
import { AccordionItem } from "./accordion-item";
import { AccordionTrigger } from "./accordion-trigger";
import { useAccordionDefaultProps } from "./use-accordion-default-props";

const accordionVariants = tv({
  base: "group/accordion flex w-full min-w-0 flex-col",
  variants: {
    variant: {
      default: "",
      bordered: "border-border bg-background overflow-hidden rounded-lg border",
      ghost: "gap-1",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export type AccordionProps = AccordionPrimitive.Root.Props &
  VariantProps<typeof accordionVariants> & {
    size?: UISize;
  };

const Accordion = (incomingProps: AccordionProps) => {
  const {
    className,
    size: providedSize,
    variant = "default",
    ...props
  } = useAccordionDefaultProps(incomingProps);
  const size = useComponentSize(providedSize);
  const contextValue = useMemo(() => ({ size, variant }), [size, variant]);

  return (
    <AccordionContext.Provider value={contextValue}>
      <AccordionPrimitive.Root
        className={mergeBaseUIClassName<AccordionPrimitive.Root.State>(
          accordionVariants({ variant }),
          className
        )}
        data-size={size}
        data-slot="accordion"
        data-variant={variant}
        {...props}
      />
    </AccordionContext.Provider>
  );
};

Accordion.Content = AccordionContent;
Accordion.Header = AccordionHeader;
Accordion.Item = AccordionItem;
Accordion.Trigger = AccordionTrigger;

export {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionItem,
  AccordionTrigger,
  accordionVariants,
};

export type { AccordionContentProps } from "./accordion-content";
export type { AccordionHeaderProps } from "./accordion-header";
export type { AccordionItemProps } from "./accordion-item";
export type { AccordionTriggerProps } from "./accordion-trigger";
