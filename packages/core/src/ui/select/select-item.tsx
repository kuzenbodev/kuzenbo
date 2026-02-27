"use client";

import { Select as SelectPrimitive } from "@base-ui/react/select";
import { Tick02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useContext } from "react";
import { tv, type VariantProps } from "tailwind-variants";

import type { InputSize } from "../input/input";

import { mergeBaseUIClassName } from "../../utils/merge-base-ui-class-name";
import { SelectItemIndicator } from "./select-item-indicator";
import { SelectItemText } from "./select-item-text";
import { SelectOverlayContext } from "./select-overlay-context";

const selectItemVariants = tv({
  slots: {
    icon: "pointer-events-none",
    root: "relative flex w-full cursor-clickable items-center rounded-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground not-data-[variant=danger]:focus:**:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 *:[span]:last:flex *:[span]:last:items-center",
  },
  variants: {
    size: {
      xs: {
        icon: "size-3",
        root: "gap-1 py-1 pr-6 pl-1.5 text-xs [&_svg:not([class*='size-'])]:size-3 *:[span]:last:gap-1",
      },
      sm: {
        icon: "size-3.5",
        root: "gap-1.5 py-1 pr-7 pl-2 text-sm [&_svg:not([class*='size-'])]:size-3.5 *:[span]:last:gap-1.5",
      },
      md: {
        icon: "size-4",
        root: "gap-2 py-1.5 pr-8 pl-2 text-sm [&_svg:not([class*='size-'])]:size-4 *:[span]:last:gap-2",
      },
      lg: {
        icon: "size-4",
        root: "gap-2 py-2 pr-9 pl-2.5 text-sm [&_svg:not([class*='size-'])]:size-4 *:[span]:last:gap-2",
      },
      xl: {
        icon: "size-5",
        root: "gap-2.5 py-2.5 pr-10 pl-3 text-base [&_svg:not([class*='size-'])]:size-5 *:[span]:last:gap-2.5",
      },
    },
  },
  defaultVariants: {
    size: "md",
  },
});

type SelectItemVariantProps = VariantProps<typeof selectItemVariants>;

export type SelectItemProps = SelectPrimitive.Item.Props &
  SelectItemVariantProps;

const SelectItem = ({
  className,
  children,
  size,
  ...props
}: SelectItemProps) => {
  const { size: overlaySize } = useContext(SelectOverlayContext);
  const resolvedSize: InputSize = size ?? overlaySize ?? "md";
  const { icon, root } = selectItemVariants({ size: resolvedSize });

  return (
    <SelectPrimitive.Item
      className={mergeBaseUIClassName<SelectPrimitive.Item.State>(
        root(),
        className
      )}
      data-size={resolvedSize}
      data-slot="select-item"
      {...props}
    >
      <SelectItemText>{children}</SelectItemText>
      <SelectItemIndicator size={resolvedSize}>
        <HugeiconsIcon className={icon()} icon={Tick02Icon} strokeWidth={2} />
      </SelectItemIndicator>
    </SelectPrimitive.Item>
  );
};

export { SelectItem };
