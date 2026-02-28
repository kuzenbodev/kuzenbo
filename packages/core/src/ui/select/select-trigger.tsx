"use client";

import { Select as SelectPrimitive } from "@base-ui/react/select";
import { UnfoldMoreIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useContext } from "react";
import { cn, tv } from "tailwind-variants";
import type { VariantProps } from "tailwind-variants";

import { mergeBaseUIClassName } from "../../utils/merge-base-ui-class-name";
import {
  resolveDefaultIconClassBySize,
  resolveDefaultNestedIconClassBySize,
  resolveFieldHeightClassBySize,
  resolveFieldTextClassBySize,
} from "../shared/size/size-system";
import { SelectContext } from "./select-context";
import { SelectIcon } from "./select-icon";

const selectTriggerVariants = tv({
  base: "cursor-clickable border-input focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:border-danger aria-invalid:ring-danger/20 data-placeholder:text-muted-foreground dark:bg-input/30 dark:hover:bg-input/50 dark:aria-invalid:border-danger/50 dark:aria-invalid:ring-danger/40 flex w-fit items-center justify-between border bg-transparent whitespace-nowrap transition-colors outline-none select-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:ring-[3px] *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center [&_svg]:pointer-events-none [&_svg]:shrink-0",
  defaultVariants: {
    size: "md",
  },
  variants: {
    size: {
      lg: [
        resolveFieldHeightClassBySize("lg"),
        resolveFieldTextClassBySize("lg"),
        resolveDefaultNestedIconClassBySize("lg"),
        "gap-1.5 rounded-md pr-2.5 pl-3 *:data-[slot=select-value]:gap-1.5",
      ],
      md: [
        resolveFieldHeightClassBySize("md"),
        resolveFieldTextClassBySize("md"),
        resolveDefaultNestedIconClassBySize("md"),
        "gap-1.5 rounded-md pr-2 pl-2.5 *:data-[slot=select-value]:gap-1.5",
      ],
      sm: [
        resolveFieldHeightClassBySize("sm"),
        resolveFieldTextClassBySize("sm"),
        resolveDefaultNestedIconClassBySize("sm"),
        "gap-1 rounded-[min(var(--radius-md),10px)] pr-2 pl-2.5 *:data-[slot=select-value]:gap-1.5",
      ],
      xl: [
        resolveFieldHeightClassBySize("xl"),
        resolveFieldTextClassBySize("xl"),
        resolveDefaultNestedIconClassBySize("xl"),
        "gap-2 rounded-md pr-3 pl-4 *:data-[slot=select-value]:gap-2",
      ],
      xs: [
        resolveFieldHeightClassBySize("xs"),
        resolveFieldTextClassBySize("xs"),
        resolveDefaultNestedIconClassBySize("xs"),
        "gap-1 rounded-[min(var(--radius-md),8px)] pr-1.5 pl-2 *:data-[slot=select-value]:gap-1",
      ],
    },
  },
});

export type SelectTriggerProps = SelectPrimitive.Trigger.Props &
  VariantProps<typeof selectTriggerVariants>;

const SelectTrigger = ({
  className,
  size,
  children,
  ...props
}: SelectTriggerProps) => {
  const { size: contextSize } = useContext(SelectContext);
  const resolvedSize = size ?? contextSize ?? "md";

  return (
    <SelectPrimitive.Trigger
      className={mergeBaseUIClassName<SelectPrimitive.Trigger.State>(
        selectTriggerVariants({ size: resolvedSize }),
        className
      )}
      data-size={resolvedSize}
      data-slot="select-trigger"
      {...props}
    >
      {children}
      <SelectIcon
        render={
          <HugeiconsIcon
            className={cn(
              "text-muted-foreground pointer-events-none",
              resolveDefaultIconClassBySize(resolvedSize)
            )}
            icon={UnfoldMoreIcon}
            strokeWidth={2}
          />
        }
      />
    </SelectPrimitive.Trigger>
  );
};

export { SelectTrigger };
