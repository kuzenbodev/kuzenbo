import { ContextMenu as ContextMenuPrimitive } from "@base-ui/react/context-menu";
import { useContext } from "react";
import { cn, tv, type VariantProps } from "tailwind-variants";

import type { InputSize } from "../input/input";
import { ContextMenuContext } from "./context-menu-context";
import { ContextMenuOverlayContext } from "./context-menu-overlay-context";

const contextMenuPopupVariants = tv({
  base: "z-overlay bg-popover text-popover-foreground ring-foreground/10 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 max-h-(--available-height) origin-(--transform-origin) overflow-x-hidden overflow-y-auto shadow-md ring-1 duration-100 outline-none",
  variants: {
    size: {
      xs: "min-w-28 rounded-[min(var(--radius-md),8px)] p-0.5",
      sm: "min-w-32 rounded-[min(var(--radius-md),10px)] p-0.5",
      md: "min-w-36 rounded-md p-1",
      lg: "min-w-40 rounded-md p-1.5",
      xl: "min-w-44 rounded-md p-2",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

type ContextMenuPopupVariantProps = VariantProps<
  typeof contextMenuPopupVariants
>;

export type ContextMenuPopupProps = ContextMenuPrimitive.Popup.Props &
  ContextMenuPopupVariantProps;

const ContextMenuPopup = ({
  className,
  size,
  ...props
}: ContextMenuPopupProps) => {
  const { size: rootSize } = useContext(ContextMenuContext);
  const { size: overlaySize } = useContext(ContextMenuOverlayContext);
  const resolvedSize: InputSize = size ?? overlaySize ?? rootSize ?? "md";

  return (
    <ContextMenuPrimitive.Popup
      className={cn(
        contextMenuPopupVariants({ size: resolvedSize }),
        className
      )}
      data-size={resolvedSize}
      data-slot="context-menu-popup"
      {...props}
    />
  );
};

export { ContextMenuPopup };
