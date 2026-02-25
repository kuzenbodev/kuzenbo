import { ContextMenu as ContextMenuPrimitive } from "@base-ui/react/context-menu";
import { useContext } from "react";
import { cn, tv, type VariantProps } from "tailwind-variants";

import type { InputSize } from "../input/input";

import { ContextMenuContext } from "./context-menu-context";
import { ContextMenuOverlayContext } from "./context-menu-overlay-context";

const contextMenuSeparatorVariants = tv({
  base: "h-px bg-border",
  variants: {
    size: {
      xs: "-mx-0.5 my-0.5",
      sm: "-mx-0.5 my-0.5",
      md: "-mx-1 my-1",
      lg: "-mx-1.5 my-1.5",
      xl: "-mx-2 my-2",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export type ContextMenuSeparatorProps = ContextMenuPrimitive.Separator.Props;

const ContextMenuSeparator = ({
  className,
  size,
  ...props
}: ContextMenuSeparatorProps &
  VariantProps<typeof contextMenuSeparatorVariants>) => {
  const { size: rootSize } = useContext(ContextMenuContext);
  const { size: overlaySize } = useContext(ContextMenuOverlayContext);
  const resolvedSize: InputSize = size ?? overlaySize ?? rootSize ?? "md";

  return (
    <ContextMenuPrimitive.Separator
      className={cn(
        contextMenuSeparatorVariants({ size: resolvedSize }),
        className
      )}
      data-size={resolvedSize}
      data-slot="context-menu-separator"
      {...props}
    />
  );
};

export { ContextMenuSeparator };
