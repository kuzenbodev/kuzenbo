import type { ComponentProps } from "react";
import { useContext } from "react";
import { cn, tv, type VariantProps } from "tailwind-variants";

import { DropdownMenuShortcut } from "../dropdown-menu/dropdown-menu";
import type { InputSize } from "../input/input";
import { MenubarContext } from "./menubar-context";
import { MenubarOverlayContext } from "./menubar-overlay-context";

const menubarShortcutVariants = tv({
  base: "text-muted-foreground group-focus/menubar-item:text-accent-foreground ml-auto",
  variants: {
    size: {
      xs: "text-[10px] tracking-wide",
      sm: "text-xs tracking-wider",
      md: "text-xs tracking-widest",
      lg: "text-xs tracking-widest",
      xl: "text-sm tracking-wide",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export type MenubarShortcutProps = ComponentProps<typeof DropdownMenuShortcut> &
  VariantProps<typeof menubarShortcutVariants> & {
    size?: InputSize;
  };

const MenubarShortcut = ({
  className,
  size,
  ...props
}: MenubarShortcutProps) => {
  const { size: rootSize } = useContext(MenubarContext);
  const { size: overlaySize } = useContext(MenubarOverlayContext);
  const resolvedSize: InputSize = size ?? overlaySize ?? rootSize ?? "md";

  return (
    <DropdownMenuShortcut
      className={cn(menubarShortcutVariants({ size: resolvedSize }), className)}
      data-size={resolvedSize}
      data-slot="menubar-shortcut"
      size={resolvedSize}
      {...props}
    />
  );
};

export { MenubarShortcut };
