import { ContextMenu as ContextMenuPrimitive } from "@base-ui/react/context-menu";
import { useContext } from "react";
import { cn, tv, type VariantProps } from "tailwind-variants";

import type { InputSize } from "../input/input";
import { ContextMenuContext } from "./context-menu-context";
import { ContextMenuOverlayContext } from "./context-menu-overlay-context";

const contextMenuLabelVariants = tv({
  base: "text-muted-foreground font-medium data-[inset]:pl-8",
  variants: {
    size: {
      xs: "px-1.5 py-1 text-[11px]",
      sm: "px-1.5 py-1 text-xs",
      md: "px-1.5 py-1 text-xs",
      lg: "px-2 py-1.5 text-xs",
      xl: "px-2.5 py-1.5 text-sm",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export type ContextMenuLabelProps = ContextMenuPrimitive.GroupLabel.Props & {
  inset?: boolean;
} & VariantProps<typeof contextMenuLabelVariants>;

const ContextMenuLabel = ({
  className,
  inset,
  size,
  ...props
}: ContextMenuLabelProps) => {
  const { size: rootSize } = useContext(ContextMenuContext);
  const { size: overlaySize } = useContext(ContextMenuOverlayContext);
  const resolvedSize: InputSize = size ?? overlaySize ?? rootSize ?? "md";

  return (
    <ContextMenuPrimitive.GroupLabel
      className={cn(
        contextMenuLabelVariants({ size: resolvedSize }),
        className
      )}
      data-inset={inset}
      data-size={resolvedSize}
      data-slot="context-menu-label"
      {...props}
    />
  );
};

export { ContextMenuLabel };
