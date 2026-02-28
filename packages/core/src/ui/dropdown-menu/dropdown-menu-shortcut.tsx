import type { ComponentProps } from "react";
import { useContext } from "react";
import { cn, tv } from "tailwind-variants";
import type { VariantProps } from "tailwind-variants";

import type { InputSize } from "../input/input";
import { DropdownMenuContext } from "./dropdown-menu-context";
import { DropdownMenuOverlayContext } from "./dropdown-menu-overlay-context";

const dropdownMenuShortcutVariants = tv({
  base: "text-muted-foreground group-focus/dropdown-menu-item:text-accent-foreground ml-auto",
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
