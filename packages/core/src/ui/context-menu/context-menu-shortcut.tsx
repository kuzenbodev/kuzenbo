import type { ComponentProps } from "react";
import { useContext } from "react";
import { cn, tv } from "tailwind-variants";
import type { VariantProps } from "tailwind-variants";

import type { InputSize } from "../input/input";
import { ContextMenuContext } from "./context-menu-context";
import { ContextMenuOverlayContext } from "./context-menu-overlay-context";

const contextMenuShortcutVariants = tv({
  base: "text-muted-foreground group-focus/context-menu-item:text-accent-foreground ml-auto",
  defaultVariants: {
    size: "md",
  },
  variants: {
    size: {
      lg: "text-xs tracking-widest",
      md: "text-xs tracking-widest",
      sm: "text-xs tracking-wider",
      xl: "text-sm tracking-wide",
      xs: "text-[10px] tracking-wide",
    },
  },
});

export type ContextMenuShortcutProps = ComponentProps<"span"> &
  VariantProps<typeof contextMenuShortcutVariants>;

const ContextMenuShortcut = ({
  className,
  size,
  ...props
}: ContextMenuShortcutProps) => {
  const { size: rootSize } = useContext(ContextMenuContext);
  const { size: overlaySize } = useContext(ContextMenuOverlayContext);
  const resolvedSize: InputSize = size ?? overlaySize ?? rootSize ?? "md";

  return (
    <span
      className={cn(
        contextMenuShortcutVariants({ size: resolvedSize }),
        className
      )}
      data-size={resolvedSize}
      data-slot="context-menu-shortcut"
      {...props}
    />
  );
};

export { ContextMenuShortcut };
