"use client";

import { Select as SelectPrimitive } from "@base-ui/react/select";
import { UnfoldMoreIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useContext } from "react";
import { cn, tv, type VariantProps } from "tailwind-variants";

import type { InputSize } from "../input/input";

import { mergeBaseUIClassName } from "../../utils/merge-base-ui-class-name";
import {
  DEFAULT_ICON_CLASS_BY_SIZE,
  DEFAULT_NESTED_ICON_CLASS_BY_SIZE,
  FIELD_HEIGHT_CLASS_BY_SIZE,
  FIELD_TEXT_CLASS_BY_SIZE,
} from "../shared/size/size-system";
import { SelectContext } from "./select-context";
import { SelectIcon } from "./select-icon";

const selectTriggerVariants = tv({
  base: "flex w-fit cursor-clickable items-center justify-between border border-input bg-transparent whitespace-nowrap transition-colors outline-none select-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-danger aria-invalid:ring-[3px] aria-invalid:ring-danger/20 data-placeholder:text-muted-foreground *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center dark:bg-input/30 dark:hover:bg-input/50 dark:aria-invalid:border-danger/50 dark:aria-invalid:ring-danger/40 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  variants: {
    size: {
      xs: [
        FIELD_HEIGHT_CLASS_BY_SIZE.xs,
        FIELD_TEXT_CLASS_BY_SIZE.xs,
        DEFAULT_NESTED_ICON_CLASS_BY_SIZE.xs,
        "gap-1 rounded-[min(var(--radius-md),8px)] pr-1.5 pl-2 *:data-[slot=select-value]:gap-1",
      ],
      sm: [
        FIELD_HEIGHT_CLASS_BY_SIZE.sm,
        FIELD_TEXT_CLASS_BY_SIZE.sm,
        DEFAULT_NESTED_ICON_CLASS_BY_SIZE.sm,
        "gap-1 rounded-[min(var(--radius-md),10px)] pr-2 pl-2.5 *:data-[slot=select-value]:gap-1.5",
      ],
      md: [
        FIELD_HEIGHT_CLASS_BY_SIZE.md,
        FIELD_TEXT_CLASS_BY_SIZE.md,
        DEFAULT_NESTED_ICON_CLASS_BY_SIZE.md,
        "gap-1.5 rounded-md pr-2 pl-2.5 *:data-[slot=select-value]:gap-1.5",
      ],
      lg: [
        FIELD_HEIGHT_CLASS_BY_SIZE.lg,
        FIELD_TEXT_CLASS_BY_SIZE.lg,
        DEFAULT_NESTED_ICON_CLASS_BY_SIZE.lg,
        "gap-1.5 rounded-md pr-2.5 pl-3 *:data-[slot=select-value]:gap-1.5",
      ],
      xl: [
        FIELD_HEIGHT_CLASS_BY_SIZE.xl,
        FIELD_TEXT_CLASS_BY_SIZE.xl,
        DEFAULT_NESTED_ICON_CLASS_BY_SIZE.xl,
        "gap-2 rounded-md pr-3 pl-4 *:data-[slot=select-value]:gap-2",
      ],
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export type SelectTriggerProps = SelectPrimitive.Trigger.Props &
  VariantProps<typeof selectTriggerVariants>;

const getSelectIconSizeClassName = (size: InputSize) =>
  DEFAULT_ICON_CLASS_BY_SIZE[size];

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
              "pointer-events-none text-muted-foreground",
              getSelectIconSizeClassName(resolvedSize)
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
