"use client";

import { Combobox as ComboboxPrimitive } from "@base-ui/react";
import { ArrowDown01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { mergeBaseUIClassName } from "../../utils/merge-base-ui-class-name";
import { ComboboxIcon } from "./combobox-icon";

export type ComboboxTriggerProps = ComboboxPrimitive.Trigger.Props;

const ComboboxTrigger = ({
  className,
  children,
  ...props
}: ComboboxTriggerProps) => (
  <ComboboxPrimitive.Trigger
    className={mergeBaseUIClassName<ComboboxPrimitive.Trigger.State>(
      "cursor-clickable",
      className
    )}
    data-slot="combobox-trigger"
    {...props}
  >
    {children}
    <ComboboxIcon
      render={
        <HugeiconsIcon
          className="text-muted-foreground pointer-events-none"
          icon={ArrowDown01Icon}
          strokeWidth={2}
        />
      }
    />
  </ComboboxPrimitive.Trigger>
);

export { ComboboxTrigger };
