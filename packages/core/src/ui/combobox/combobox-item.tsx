"use client";

import { Combobox as ComboboxPrimitive } from "@base-ui/react";
import { Tick02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useContext } from "react";
import { tv, type VariantProps } from "tailwind-variants";

import type { InputSize } from "../input/input";

import { mergeBaseUIClassName } from "../../utils/merge-base-ui-class-name";
import { ComboboxItemIndicator } from "./combobox-item-indicator";
import { ComboboxOverlayContext } from "./combobox-overlay-context";

const comboboxItemVariants = tv({
  slots: {
    icon: "pointer-events-none",
    root: "relative flex w-full cursor-clickable items-center rounded-md outline-hidden select-none data-highlighted:bg-accent data-highlighted:text-accent-foreground not-data-[variant=danger]:data-highlighted:**:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  },
  variants: {
    size: {
      xs: {
        icon: "size-3",
        root: "gap-1 py-1 pr-6 pl-1.5 text-xs [&_svg:not([class*='size-'])]:size-3",
      },
      sm: {
        icon: "size-3.5",
        root: "gap-1.5 py-1 pr-7 pl-2 text-sm [&_svg:not([class*='size-'])]:size-3.5",
      },
      md: {
        icon: "size-4",
        root: "gap-2 py-1.5 pr-8 pl-1.5 text-sm [&_svg:not([class*='size-'])]:size-4",
      },
      lg: {
        icon: "size-4",
        root: "gap-2 py-2 pr-9 pl-2 text-sm [&_svg:not([class*='size-'])]:size-4",
      },
      xl: {
        icon: "size-5",
        root: "gap-2.5 py-2.5 pr-10 pl-2.5 text-base [&_svg:not([class*='size-'])]:size-5",
      },
    },
  },
  defaultVariants: {
    size: "md",
  },
});

type ComboboxItemVariantProps = VariantProps<typeof comboboxItemVariants>;

export type ComboboxItemProps = ComboboxPrimitive.Item.Props &
  ComboboxItemVariantProps;

const ComboboxItem = ({
  className,
  children,
  size,
  ...props
}: ComboboxItemProps) => {
  const { size: overlaySize } = useContext(ComboboxOverlayContext);
  const resolvedSize: InputSize = size ?? overlaySize ?? "md";
  const { icon, root } = comboboxItemVariants({ size: resolvedSize });

  return (
    <ComboboxPrimitive.Item
      className={mergeBaseUIClassName<ComboboxPrimitive.Item.State>(
        root(),
        className
      )}
      data-size={resolvedSize}
      data-slot="combobox-item"
      {...props}
    >
      {children}
      <ComboboxItemIndicator size={resolvedSize}>
        <HugeiconsIcon className={icon()} icon={Tick02Icon} strokeWidth={2} />
      </ComboboxItemIndicator>
    </ComboboxPrimitive.Item>
  );
};

export { ComboboxItem };
