import type { ComponentProps } from "react";
import { useContext } from "react";
import { cn, tv } from "tailwind-variants";
import type { VariantProps } from "tailwind-variants";

import { DropdownMenuShortcut } from "../dropdown-menu/dropdown-menu";
import type { InputSize } from "../input/input";
import { MenubarContext } from "./menubar-context";
import { MenubarOverlayContext } from "./menubar-overlay-context";

const menubarShortcutVariants = tv({
  base: "text-muted-foreground group-focus/menubar-item:text-accent-foreground ml-auto",
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
