import type { ComponentProps } from "react";
import { useContext } from "react";
import { cn, tv, type VariantProps } from "tailwind-variants";

import type { InputSize } from "../input/input";
import { DropdownMenuContext } from "./dropdown-menu-context";
import { DropdownMenuOverlayContext } from "./dropdown-menu-overlay-context";

const dropdownMenuShortcutVariants = tv({
  base: "text-muted-foreground group-focus/dropdown-menu-item:text-accent-foreground ml-auto",
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

export type DropdownMenuShortcutProps = ComponentProps<"span"> &
  VariantProps<typeof dropdownMenuShortcutVariants>;

const DropdownMenuShortcut = ({
  className,
  size,
  ...props
}: DropdownMenuShortcutProps) => {
  const { size: rootSize } = useContext(DropdownMenuContext);
  const { size: overlaySize } = useContext(DropdownMenuOverlayContext);
  const resolvedSize: InputSize = size ?? overlaySize ?? rootSize ?? "md";

  return (
    <span
      className={cn(
        dropdownMenuShortcutVariants({ size: resolvedSize }),
        className
      )}
      data-size={resolvedSize}
      data-slot="dropdown-menu-shortcut"
      {...props}
    />
  );
};

export { DropdownMenuShortcut };
