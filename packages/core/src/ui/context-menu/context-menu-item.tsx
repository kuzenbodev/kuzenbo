import { ContextMenu as ContextMenuPrimitive } from "@base-ui/react/context-menu";
import { useContext } from "react";
import { tv, type VariantProps } from "tailwind-variants";

import { mergeBaseUIClassName } from "../../utils/merge-base-ui-class-name";
import type { InputSize } from "../input/input";
import { ContextMenuContext } from "./context-menu-context";
import { ContextMenuOverlayContext } from "./context-menu-overlay-context";

const contextMenuItemVariants = tv({
  base: "group/context-menu-item cursor-clickable focus:bg-accent focus:text-accent-foreground relative flex items-center outline-hidden select-none data-disabled:pointer-events-none data-disabled:cursor-not-allowed data-disabled:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  variants: {
    inset: {
      false: "",
      true: "",
    },
    size: {
      xs: "gap-1 rounded-[min(var(--radius-md),8px)] px-1.5 py-1 text-xs [&_svg:not([class*='size-'])]:size-3",
      sm: "gap-1.5 rounded-[min(var(--radius-md),10px)] px-1.5 py-1 text-sm [&_svg:not([class*='size-'])]:size-3.5",
      md: "gap-1.5 rounded-md px-1.5 py-1 text-sm [&_svg:not([class*='size-'])]:size-4",
      lg: "gap-2 rounded-md px-2 py-1.5 text-sm [&_svg:not([class*='size-'])]:size-4",
      xl: "gap-2.5 rounded-md px-2.5 py-2 text-base [&_svg:not([class*='size-'])]:size-5",
    },
    variant: {
      danger:
        "text-danger-foreground focus:bg-danger focus:text-danger-foreground dark:focus:bg-danger/20 *:[svg]:text-danger-foreground",
      default: "focus:*:[svg]:text-accent-foreground",
    },
  },
  defaultVariants: {
    inset: false,
    size: "md",
    variant: "default",
  },
});

export type ContextMenuItemProps = ContextMenuPrimitive.Item.Props &
  VariantProps<typeof contextMenuItemVariants>;

const ContextMenuItem = ({
  className,
  inset,
  size,
  variant = "default",
  ...props
}: ContextMenuItemProps) => {
  const { size: rootSize } = useContext(ContextMenuContext);
  const { size: overlaySize } = useContext(ContextMenuOverlayContext);
  const resolvedSize: InputSize = size ?? overlaySize ?? rootSize ?? "md";

  return (
    <ContextMenuPrimitive.Item
      className={mergeBaseUIClassName<ContextMenuPrimitive.Item.State>(
        contextMenuItemVariants({
          inset: Boolean(inset),
          size: resolvedSize,
          variant,
        }),
        className
      )}
      data-inset={inset}
      data-size={resolvedSize}
      data-slot="context-menu-item"
      data-variant={variant}
      {...props}
    />
  );
};

export { ContextMenuItem };
